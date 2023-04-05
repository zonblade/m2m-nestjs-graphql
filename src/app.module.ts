import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { CommerceModule } from './commerce/commerce.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HelloResolver } from './app.resolver';
import { MONGO_CONNECTION } from './lib/globalConstant';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONNECTION,{
      dbName:'test',
      connectTimeoutMS: 10000,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground:true
    }),
    UsersModule,
    AuthModule,
    ItemsModule,
    CommerceModule,
  ],
  controllers: [AppController],
  providers: [AppService, HelloResolver],
})
export class AppModule {}
