import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ItemInput {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field()
  image: number;

  @Field()
  price: number;

  @Field()
  availability: number;

  @Field()
  for_sale: boolean;
}
