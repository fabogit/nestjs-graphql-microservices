import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';

/**
 * Resolver for handling GraphQL queries and field resolutions related to `User` entities.
 * Specifically, this resolver is responsible for resolving the `posts` field on the `User` type,
 * fetching the associated posts for a given user.
 * @Resolver(() => User) Decorator indicating that this class resolves fields for the User GraphQL type.
 */
@Resolver(() => User)
export class UsersResolver {
  /**
   * Constructor for UsersResolver.
   * @param {PostsService} postsService - Service responsible for post-related business logic.
   * Injected by NestJS dependency injection to handle post data retrieval.
   */
  constructor(private readonly postsService: PostsService) {}

  /**
   * Resolver field to fetch the list of `Posts` authored by a `User`.
   * This resolver is automatically called by GraphQL when the `posts` field is queried on a `User` object.
   * It utilizes the `PostsService` to retrieve posts based on the User's ID.
   * @ResolveField(() => [Post]) Decorator indicating this method resolves the `posts` field of the `User` type to a list of `Post` objects.
   * @param {User} user - The parent User object, automatically passed by GraphQL, from which to extract the author ID.
   * @returns {Post[]} An array of `Post` objects authored by the `User`.
   */
  @ResolveField(() => [Post])
  posts(@Parent() user: User): Post[] {
    return this.postsService.forAuthor(user.id);
  }
}
