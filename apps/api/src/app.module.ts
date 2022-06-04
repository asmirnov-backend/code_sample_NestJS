import { join } from 'path';

import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { BroadstreetModule } from './broadstreet/broadstreet.module';
import { MetadataModule } from './metadata/metadata.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./apps/api/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), '/apps/api/src/graphql.schema.ts'),
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    BroadstreetModule,
    MetadataModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
