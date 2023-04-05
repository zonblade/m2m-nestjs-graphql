import { Module } from '@nestjs/common';
import { CommerceService } from './commerce.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommerceReviewSchema, CommerceSchema } from './commerce.model';
// import { ItemsModule } from 'src/items/items.module';
import { ItemsSchema } from 'src/items/items.model';

@Module({
  imports: [
    // ItemsModule,
    MongooseModule.forFeature([
      { name: 'Commerce', schema: CommerceSchema },
      { name: 'CommerceReview', schema: CommerceReviewSchema },
      { name: 'Items', schema: ItemsSchema },
    ]),
  ],
  providers: [CommerceService],
  exports: [CommerceService],
})
export class CommerceModule {}
