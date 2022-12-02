import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import DatabaseModule  from './database/database.module';
/**
 * @class AppModule
 */
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      cors:{
        origin:"http://localhost:3000",
        credentials: true,
      }
    }),
    UserModule,
    DatabaseModule
  ]
})
export class AppModule {}