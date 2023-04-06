import { Injectable } from '@nestjs/common';
import { ItemsDocument } from './items.model';
import BadWord from 'src/lib/badWord';
import { Model } from 'mongoose';
import {
  I_ItemDocument,
  I_ItemParam,
  I_ItemSearchResult,
} from './items.interface';
import { ObjectId } from 'bson';
import { createSearchIndex } from 'src/lib/indexEngine';
import { FILE_SERVER } from 'src/lib/globalConstant';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('Items') private readonly itemsSchema: Model<ItemsDocument>,
  ) {}

  async ItemCreate(user_id: ObjectId, input: I_ItemParam): Promise<string> {
    const filter = new BadWord();
    const itemId = new ObjectId();
    const indexString = createSearchIndex(input.name).join(' ');
    const initialDocument: I_ItemDocument = {
      _id: itemId,
      _user: user_id,
      _creator: user_id,
      _original: null,
      _ownership: [user_id],

      name: filter.filter(input.name),
      category: input.category,
      image: input.image,
      price: input.price,
      availability: input.availability,

      bought: 0,
      reputation: {
        badge: 'first',
        value: 0,
      },
      time: {
        created: new Date(),
        updated: new Date(),
      },
      control: {
        active: true,
        deleted: false,
        banned: false,
        for_sale: input.for_sale,
        editable: true,
      },
      indexes: indexString,
    };
    const result = await this.itemsSchema.insertMany([initialDocument]);
    if (result.length > 0) {
      return itemId.toHexString();
    } else {
      return '';
    }
  }

  async ItemFind(
    page: number,
    user_id: ObjectId | null,
    search: string,
  ): Promise<I_ItemSearchResult[] | []> {
    // this MVP only support random sampling for this technical interview test purposes.
    // to mock the diversation of content.
    // and mocking pages.
    let findByMe: object = { $text: { $search: search } };
    if (user_id) {
      findByMe = {
        $and: [
          { $text: { $search: search } },
          { is_deleted: false },
          { $or: [{ _user_id: user_id }, { _ownership: user_id }] },
        ],
      };
    }
    const result: I_ItemSearchResult[] = await this.itemsSchema.aggregate([
      { $match: findByMe },
      { $sample: { size: 20 } },
      {
        $project: {
          id: { $toString: '$_id' },
          name: '$name',
          category: '$category',
          image: { $concat: [FILE_SERVER, '/image/', '$image'] },
          reputation: '$reputation',
          reputationBadge: '$reputation.badge',
          price: '$price',
          availability: '$availability',
          _id: 0,
        },
      },
    ]);
    if (result.length > 0) {
      return result;
    } else {
      return [];
    }
  }

  async ItemUpdate(
    user_id: ObjectId,
    item_id: ObjectId,
    input: I_ItemParam,
  ): Promise<boolean> {
    const filter = new BadWord();
    const indexString = createSearchIndex(input.name).join(' ');
    const result = await this.itemsSchema.updateOne(
      { _id: item_id, _user: user_id },
      {
        $set: {
          ...input,
          name: filter.filter(input.name),
          indexes: indexString,
        },
      },
    );
    if (result.modifiedCount > 0) {
      return true;
    } else {
      return false;
    }
  }

  async ItemDelete(id: string): Promise<boolean> {
    let item_oid = new ObjectId();
    try {
      item_oid = new ObjectId(id);
    } catch {
      return false;
    }
    const result = await this.itemsSchema.updateOne(
      { _id: item_oid },
      {
        $set: {
          is_deleted: true,
        },
      },
    );
    if (result.modifiedCount > 0) {
      return true;
    } else {
      return false;
    }
  }
}
