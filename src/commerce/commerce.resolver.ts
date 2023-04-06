import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { CommerceInput, CommerceReview } from './commerce.model.input';
import { CommerceService } from './commerce.service';
import { CommerceOrerHistory, CommerceSubmit } from './commerce.model.view';
import { AuthGuard } from 'src/lib/jwt.verify';
import { UseGuards } from '@nestjs/common';
import { JwtPayload } from 'src/lib/jwt.sign';
import { ObjectId } from 'bson';

@Resolver()
export class CommerceResolver {
  constructor(private itemService: CommerceService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => CommerceSubmit)
  async commerceBuy(
    @Args('input') input: CommerceInput,
    @Context('user') user: JwtPayload,
  ) {
    try {
      const item_id = new ObjectId(input.item_id);
      const user_id = new ObjectId(user.sub);
      const result = await this.itemService.itemAcquire(
        item_id,
        user_id,
        input.quantity,
      );
      return {
        success: result,
      };
    } catch {
      return {
        success: false,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CommerceSubmit)
  async commerceReview(
    @Args('input') input: CommerceReview,
    @Context('user') user: JwtPayload,
  ) {
    try {
      const order_id = new ObjectId(input.order_id);
      const user_id = new ObjectId(user.sub);
      const result = await this.itemService.itemReview(
        order_id,
        user_id,
        input.rating,
      );
      return {
        success: result,
      };
    } catch {
      return {
        success: false,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => [CommerceOrerHistory])
  async commerceHistory(@Context('user') user: JwtPayload) {
    try {
      const user_id = new ObjectId(user.sub);
      return await this.itemService.orderHistory(user_id);
    } catch {
      return [];
    }
  }
}
