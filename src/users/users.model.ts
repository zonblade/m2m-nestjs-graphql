import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  image: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
