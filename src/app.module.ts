import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { CommerceModule } from './commerce/commerce.module';

const dbconnection =
  'mongodb+srv://development:development@development-cluster.vgkan9x.mongodb.net/teman?retryWrites=true&w=majority';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(dbconnection),
    AuthModule,
    ItemsModule,
    CommerceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
