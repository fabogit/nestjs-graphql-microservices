/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Custom parameter decorator to extract the current user from the GraphQL context.
 * This decorator attempts to retrieve user information that have been added to the request headers by the gateway,
 * It expects the user information to be serialized as a JSON string under the `user` header.
 * If the `user` header is present and can be parsed as JSON, the decorator returns the parsed `user` object.
 * If the header is missing or parsing fails, it logs the error and returns null.
 *
 * @returns {Function} A parameter decorator function that can be used to inject the current user into GraphQL resolver arguments.
 *
 * @example
 * ```typescript
 * @Resolver()
 * export class MyResolver {
 *   @Query(() => String)
 *   myQuery(@CurrentUser() user: any): string {
 *     if (user) {
 *       return `Hello user ${user.id}`;
 *     }
 *     return 'Hello guest';
 *   }
 * }
 * ```
 */
export const CurrentUser = createParamDecorator(
  (_data: any, ctx: GqlExecutionContext) => {
    try {
      const headers = ctx.getArgs()[2].req.headers;
      if (headers.user) {
        return JSON.parse(headers.user);
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  },
);
