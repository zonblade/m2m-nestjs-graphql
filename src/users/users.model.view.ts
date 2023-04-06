import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserBasicReturn {
  @Field()
  success: boolean;

  @Field()
  token: string | null;
}
