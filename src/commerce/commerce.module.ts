import { Module } from '@nestjs/common';
import { CommerceService } from './commerce.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommerceReviewSchema, CommerceSchema } from './commerce.model';
import { ItemsSchema } from 'src/items/items.model';
import { CommerceResolver } from './commerce.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Commerce', schema: CommerceSchema },
      { name: 'CommerceReview', schema: CommerceReviewSchema },
      { name: 'Items', schema: ItemsSchema },
    ]),
  ],
  providers: [CommerceService, CommerceResolver],
  exports: [CommerceService],
})
export class CommerceModule {}
