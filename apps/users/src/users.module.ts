import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

/**
 * Module for Users feature, configuring GraphQL Federation using Apollo Federation Driver.
 * This module is responsible for setting up the GraphQL layer for user-related data and operations using Apollo Federation.
 * It configures the GraphQL module to use the Apollo Federation Driver, enabling schema federation capabilities for this service.
 * @exports {UsersModule} Exports the UsersModule class, making it available for import in other modules.
 */
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        /**
         * Configuration for automatic schema file generation, specific to Federation v2.
         * `federation: 2` ensures that the schema is generated in a format compatible with Apollo Federation v2 specifications.
         * This is essential for federated GraphQL services to correctly participate in a supergraph and be composed by a gateway.
         */
        federation: 2,
      },
    }),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
