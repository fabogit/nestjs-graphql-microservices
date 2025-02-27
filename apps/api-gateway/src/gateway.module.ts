import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { authContext } from './auth.context';

/**
 * Gateway module for federating GraphQL services using Apollo Gateway.
 * This module sets up the Apollo Gateway driver for NestJS GraphQL, configuring it to compose a supergraph from multiple subgraph services.
 * It also demonstrates context sharing and custom header propagation to subgraphs.
 * @exports {GatewayModule} Exports the GatewayModule class, making it available for import in other modules.
 */
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        // cors: true,
        /**
         * Context function for the Apollo Server.
         * Sets the context for each GraphQL operation, in this case using the authContext function.
         * @param context - The context object passed to the GraphQL server.
         * @returns The result of the authContext function, providing authentication context.
         */
        context: authContext,
      },
      gateway: {
        /**
         * Builds a custom service for each subgraph.
         * Allows modification of outgoing requests to subgraphs, such as adding headers for context propagation.
         * @param url - The URL of the subgraph service.
         * @returns A `RemoteGraphQLDataSource` instance configured to forward user context.
         */
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            /**
             * Hook to modify outgoing requests to subgraphs before they are sent.
             * Used here to propagate the user context as a header to the subgraph services.
             * @param requestContext - Context object containing the outgoing request and GraphQL context.
             */
            willSendRequest({ request, context }) {
              request.http?.headers.set(
                'user',
                context.user
                  ? JSON.stringify(context.user)
                  : JSON.stringify(null),
              );
            },
          });
        },
        /**
         * Configures how the supergraph schema is built.
         * Uses `IntrospectAndCompose` to automatically fetch and compose the schema from the defined subgraphs.
         */
        supergraphSdl: new IntrospectAndCompose({
          /**
           * Defines the list of subgraph services to include in the gateway.
           * Each entry specifies the name and URL of a subgraph.
           */
          subgraphs: [
            {
              name: 'posts',
              url: 'http://localhost:3001/graphql',
            },
            {
              name: 'users',
              url: 'http://localhost:3002/graphql',
            },
          ],
        }),
      },
    }),
  ],
})
export class GatewayModule {}
