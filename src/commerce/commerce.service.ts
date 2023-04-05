import { Injectable } from '@nestjs/common';
import {
  CommerceDocument,
  // CommerceItems,
  CommerceReviewDocument,
} from './commerce.model';
import { Model } from 'mongoose';
import { ItemsDocument } from 'src/items/items.model';
import { I_ItemDocument } from 'src/items/items.interface';
import { ObjectId } from 'bson';
import {
  I_Commerce,
  I_CommerceItem,
  I_CommercePayment,
  I_CommerceReview,
} from './commerce.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommerceService {
  constructor(
    @InjectModel('Commerce') private readonly commerceModel: Model<CommerceDocument>,
    @InjectModel('CommerceReview') private readonly commerceReviewModel: Model<CommerceReviewDocument>,
    @InjectModel('Items') private readonly itemsModel: Model<ItemsDocument>,
  ) {}

  async itemAcquire(item_id: ObjectId, user_id: ObjectId, quantity: number) {
    // create payment
    const itemAcquires = await this.itemsModel.findById(item_id);
    // but in this MVP only success case.
    // create commerce document
    const subTotal = itemAcquires.price * quantity;
    const newCommerceItem: I_CommerceItem = {
      id: item_id,
      name: itemAcquires.name,
      category: itemAcquires.category,
      price: itemAcquires.price,
      quantity: quantity,
    };
    const newCommercePayment: I_CommercePayment = {
      method: 'MVP',
      currency: 'IDR',
      amount: subTotal,
      fee: 0,
      link: null,
      account: null,
      status: 'success',
    };

    const newCommerce: I_Commerce = {
      _user_sell: new ObjectId(),
      _user_acquirer: new ObjectId(),
      items: [newCommerceItem],
      subtotal: subTotal,
      payment: newCommercePayment,
    };

    // direct save
    await this.commerceModel.insertMany([newCommerce]);

    // update old document ownership
    // adding ownership to the item
    const updatedItem = await this.itemsModel.findOneAndUpdate(
      { _id: item_id },
      [
        {
          $set: {
            _ownership: {
              $concatArrays: ['$_ownership', [user_id]],
            },
          },
        },
      ],
      { returnDocument: 'after' },
    );
    // create cloned document with ownership and user assigned to current user
    // as readonly and cannot be reselled!
    // this will act as user personal collection!
    const clonedItem: I_ItemDocument = {
      ...updatedItem,
      _id: new ObjectId(),
      _user: user_id,
      _original: item_id,
      _creator: updatedItem._user,
      _ownership: [user_id],
      availability: 0,
      bought: 0,
      time: {
        created: new Date(),
        updated: new Date(),
      },
      control: {
        ...updatedItem.control,
        for_sale: false,
        editable: false,
      },
    };
    await this.itemsModel.insertMany([clonedItem]);
    return true;
  }

  async itemReview(order_id: ObjectId, user_id: ObjectId, rating: number) {
    // only if the user is the owner of the item.
    const ratingGuarded = rating > 5 ? 5 : rating < 0 ? 0 : rating;
    const newCommerceReview: I_CommerceReview = {
      _commerce: order_id,
      _user: user_id,
      rating: ratingGuarded,
    };
    // direct save
    await this.commerceModel.insertMany([newCommerceReview]);
    // acquire all review for the item
    const itemReviews: { final_score: number }[] =
      await this.commerceReviewModel.aggregate([
        { $match: { _commerce: order_id } },
        { $group: { _id: null, final_score: { $avg: '$rating' } } },
        { $project: { _id: 0, final_score: 1 } },
      ]);
    // do calculation for the item rating.
    // find item from _commerce
    const itemData = await this.commerceModel.findById(order_id);
    const itemId = itemData.items.map((item) => {
      return item.id;
    })[0];
    // calculate the new rating
    const newRep = itemReviews[0].final_score;
    let newRepBadge = 'first';
    if (newRep >= 4) {
      newRepBadge = 'superstar';
    } else if (newRep > 2 && newRep < 4) {
      newRepBadge = 'barebone';
    } else {
      newRepBadge = 'first';
    }
    // update the item reputation
    await this.itemsModel.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          reputation: {
            badge: newRepBadge,
            value: newRep,
          },
        },
      },
    );
  }

  async orderHistory() {
    // historical order for the current user.
  }

  async paymentList() {
    // list of payment for anyone wants to buy.
    // for this MVP hardcoded in the front end.
  }

  async paymentAcquire() {
    // in this MVP only success.
    // so no need to acquire from Doku, Midtrans, or other payment gateway.
  }
}
