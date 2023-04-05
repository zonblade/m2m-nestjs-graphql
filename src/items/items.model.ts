import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Document } from 'mongoose';

class ItemRep extends Document {
  @Prop()
  badge: string;

  @Prop()
  value: number;
}

class ItemsTime extends Document {
  @Prop(() => Date)
  created: Date;

  @Prop(() => Date)
  updated: Date;
}

class ItemsControl extends Document {
  @Prop()
  active: boolean;

  @Prop()
  deleted: boolean;

  @Prop()
  banned: boolean;

  @Prop()
  for_sale: boolean;

  @Prop()
  editable: boolean;
}
@Schema({ collection: 'items' })
export class Items extends Document {
  @Prop()
  _user: ObjectId;

  @Prop()
  _creator: ObjectId;

  @Prop()
  _original: ObjectId | null;

  @Prop()
  _ownership: ObjectId[];

  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  @Prop()
  availability: number;

  @Prop(() => ItemRep)
  reputation: ItemRep;

  @Prop()
  bought: number;

  @Prop(() => ItemsTime)
  time: ItemsTime;

  @Prop(() => ItemsControl)
  control: ItemsControl;

  @Prop({ index: { text: true } })
  indexes: string;
}

export const ItemsSchema = SchemaFactory.createForClass(Items);
export type ItemsDocument = Items & Document;
