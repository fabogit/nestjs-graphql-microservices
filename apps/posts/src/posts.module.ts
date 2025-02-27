import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { UsersResolver } from './user.resolver';

/**
 * Module for Posts feature, configuring GraphQL Federation using Apollo Federation Driver.
 * This module sets up the GraphQL Federation for handling Post related data and resolvers.
 * It uses Apollo Federation Driver to enable schema federation capabilities, allowing this service to be part of a larger GraphQL supergraph.
 * @imports {GraphQLModule} Imports the GraphQLModule to configure GraphQL functionality with Apollo Federation.
 * @providers {PostsResolver, PostsService, UsersResolver} Declares the resolvers and services provided by this module, making them available for dependency injection.
 * @exports {PostsModule} Exports the PostsModule class, making it available for import in other modules.
 */
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        /**
         * Configuration for automatic schema file generation, specific to Federation v2.
         * `federation: 2` indicates that the schema should be generated in a format compatible with Apollo Federation v2.
         * This is crucial for federated GraphQL services to correctly participate in a supergraph.
         */
        federation: 2,
      },
    }),
  ],
  providers: [PostsResolver, PostsService, UsersResolver],
})
export class PostsModule {}
