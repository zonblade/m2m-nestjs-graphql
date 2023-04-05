import { Field, ObjectType, Float, Int } from '@nestjs/graphql';

//
// model view used for grapql model
//
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

@ObjectType()
export class ItemsListViewRep {
  @Field()
  badge: string;

  @Field(() => Int)
  value: number;
}
