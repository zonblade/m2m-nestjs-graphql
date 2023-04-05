// import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
// import { ItemInput } from './items.input';
// import { ItemsService } from './items.service';
// import { ItemsListView } from './items.model.view';

// @Resolver(() => ItemsListView)
// export class ItemsResolver {
//     constructor(private itemService: ItemsService) { }

//     @Mutation(() => ItemsListView)
//     async itemsCreate(@Args('input') input: ItemInput) {
//         // return this.userService.create(input);
//     }

//     @Mutation(() => ItemsListView)
//     async itemsUpdate(@Args('input') input: ItemInput) {
//         // return this.userService.update(input);
//     }

//     @Query(() => [ItemsListView])
//     async itemsList() {
//         // return this.userService.find();
//     }
// }
