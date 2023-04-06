import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CommerceInput {
  @Field()
  item_id: string;

  @Field(() => Int)
  quantity: number;
}

@InputType()
export class CommerceReview {
  @Field()
  order_id: string;

  @Field(()=>Int)
  rating: number;
}
