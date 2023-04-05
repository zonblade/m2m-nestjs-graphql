import { Module } from '@nestjs/common';
import { CommerceService } from './commerce.service';

@Module({
  providers: [CommerceService],
})
export class CommerceModule {}
