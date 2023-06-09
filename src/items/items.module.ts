import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsSchema } from './items.model';
import { ItemsResolver } from './items.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: 'Items', schema: ItemsSchema }]),
  ],
  providers: [ItemsService, ItemsResolver],
  controllers: [ItemsController],
  exports: [ItemsService],
})
export class ItemsModule {}
