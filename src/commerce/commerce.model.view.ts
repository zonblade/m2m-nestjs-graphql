import { Field, ObjectType, Int } from '@nestjs/graphql';

//
// model view used for grapql model
//
@ObjectType()
export class CommerceOrerHistory {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  category: string;

  @Field(() => Int)
  price: number;

  @Field()
  has_review: boolean;
}

@ObjectType()
export class CommerceSubmit {
  @Field()
  success: boolean;
}
