import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm"
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type:"sqlite",
      database:":memory",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize:true
    }),
    UserModule,
  ],
})
export class AppModule {}