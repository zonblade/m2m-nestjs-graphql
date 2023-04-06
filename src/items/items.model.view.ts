import { Field, ObjectType, Float, Int } from '@nestjs/graphql';

//
// model view used for grapql model
//
@ObjectType()
export class ItemCreateResult {
  @Field()
  success: boolean;

  @Field()
  item_id?: string;
}

@ObjectType()
export class ItemUpdateResult {
  @Field()
  success: boolean;
}

@ObjectType()
export class ItemsListViewRep {
  @Field()
  badge: string;

  @Field(() => Int)
  value: number;
}

@ObjectType()
export class ItemsListView {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  category: string;

  @Field(() => Float)
  rating: number;

  @Field(() => ItemsListViewRep)
  reputation: ItemsListViewRep;

  @Field()
  reputationBadge: string;

  @Field()
  image: string;

  @Field(() => Int)
  price: number;

  @Field()
  availability: number;
}
