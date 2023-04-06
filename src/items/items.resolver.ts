import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import {
  ItemCreateResult,
  ItemUpdateResult,
  ItemsListView,
} from './items.model.view';
import { ItemInput } from './items.model.input';
import { ItemsService } from './items.service';
import { ObjectId } from 'bson';
import { AuthGuard } from 'src/lib/jwt.verify';
import { UseGuards } from '@nestjs/common';
import { JwtPayload } from 'src/lib/jwt.sign';

@Resolver(() => ItemsListView)
export class ItemsResolver {
  constructor(private itemService: ItemsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ItemCreateResult)
  async itemsCreate(
    @Args('input') item: ItemInput,
    @Context('user') user: JwtPayload,
  ) {
    let token: string | null = null;
    let success = false;
    try {
      const user_id = new ObjectId(user.sub);
      const result = await this.itemService.ItemCreate(user_id, item);
      if (result.length > 0) {
        success = true;
        token = result;
      }
      return {
        success,
        item_id: token,
      };
    } catch {
      return {
        success,
        item_id: token,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ItemUpdateResult)
  async itemsUpdate(
    @Args('item_id') item_id: string,
    @Args('input') item: ItemInput,
    @Context('user') user: JwtPayload,
  ) {
    try {
      const result = await this.itemService.ItemUpdate(
        new ObjectId(user.sub),
        new ObjectId(item_id),
        item,
      );
      return { success: result };
    } catch {
      return { success: false };
    }
  }

  @Query(() => [ItemsListView])
  async itemsList(
    @Args('search') keyword: string,
    @Args('user_id') user_id: string,
  ) {
    let user_oid: ObjectId | null = null;
    try {
      user_oid = new ObjectId(user_id);
    } catch {}
    return this.itemService.ItemFind(0, user_oid, keyword);
  }
}
