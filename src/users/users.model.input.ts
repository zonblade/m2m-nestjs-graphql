import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserRegisterInput {
  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  image: string;
}

@InputType()
export class UserLoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
