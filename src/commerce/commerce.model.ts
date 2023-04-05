import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Document } from 'mongoose';

//
// in this mvp, the payment always success
//

export class CommerceItems extends Document {
  @Prop()
  id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;
}

export class CommercePayment extends Document {
  @Prop()
  method: string;

  @Prop()
  currency: string;

  @Prop()
  amount: number;

  @Prop()
  fee: number;

  @Prop()
  link: string;

  @Prop()
  account: string;

  @Prop()
  status: string;
}

@Schema({ collection: 'commerce' })
export class Commerce extends Document {
  @Prop()
  _user_sell: ObjectId;

  @Prop()
  _user_acquirer: ObjectId;

  @Prop(() => CommerceItems)
  items: CommerceItems[];

  @Prop()
  subtotal: number;

  @Prop(() => CommercePayment)
  payment: CommercePayment;
}

export const CommerceSchema = SchemaFactory.createForClass(Commerce);
export type CommerceDocument = Commerce & Document;

//
// commerce review
// for MVP we'd only use rating
//
@Schema({ collection: 'commerce_review' })
export class CommerceReview extends Document {
  @Prop()
  _user: ObjectId;

  @Prop()
  _commerce: ObjectId;

  @Prop()
  rating: number;
}

export const CommerceReviewSchema =
  SchemaFactory.createForClass(CommerceReview);
export type CommerceReviewDocument = CommerceReview & Document;
