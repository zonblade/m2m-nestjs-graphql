import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ItemInput {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field()
  image: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  availability: number;

  @Field()
  for_sale: boolean;
}
