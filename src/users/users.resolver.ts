import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserLoginInput, UserRegisterInput } from './users.model.input';
import { UserBasicReturn } from './users.model.view';

@Resolver()
export class UserResolver {
  constructor(private userService: UsersService) {}

  @Mutation(() => UserBasicReturn)
  async userRegister(@Args('input') item: UserRegisterInput) {
    const result = await this.userService.createUser(item);
    if (result) {
      return {
        success: true,
        token: result,
      };
    } else {
      return {
        success: false,
        token: null,
      };
    }
  }

  @Mutation(() => UserBasicReturn)
  async userLogin(@Args('input') item: UserLoginInput) {
    const result = await this.userService.getUser(item.username, item.password);
    if (result) {
      return {
        success: true,
        token: result,
      };
    } else {
      return {
        success: false,
        token: null,
      };
    }
  }
}
