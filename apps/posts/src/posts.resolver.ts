import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entities/post.entity';
import { User } from './entities/user.entity';
import { CurrentUser } from './current-user.decorator';

/**
 * Resolver for handling GraphQL queries and mutations related to `Post` entities.
 * This resolver defines the endpoints for creating, fetching, and resolving fields of `Post` objects.
 * @Resolver(() => Post) Decorator indicating that this class resolves fields for the Post GraphQL type.
 */
@Resolver(() => Post)
export class PostsResolver {
  /**
   * Constructor for PostsResolver.
   * @param postsService - Service responsible for post-related business logic.
   * Injected by NestJS dependency injection.
   */
  constructor(private readonly postsService: PostsService) {}

  /**
   * Mutation to create a new post.
   * @Mutation(() => Post) Decorator indicating this method is a GraphQL mutation that returns a `Post`.
   * @param createPostInput - Input data for creating a new post, received as GraphQL arguments.
   * @returns A promise that resolves to the newly created `Post` object.
   */
  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  /**
   * Query to retrieve all posts.
   * @Query(() => [Post], { name: 'posts' }) Decorator indicating this method is a GraphQL query named 'posts' that returns a list of Post.
   * @param user - The current `user`, injected via the `CurrentUser` decorator for context if needed (currently only logged).
   * @returns A promise that resolves to an array of `Post` objects.
   */
  @Query(() => [Post], { name: 'posts' })
  findAll(@CurrentUser() user: User) {
    console.log(user);
    return this.postsService.findAll();
  }

  /**
   * Query to retrieve a single post by its ID.
   * @Query(() => Post, { name: 'post' }) Decorator indicating this method is a GraphQL query named 'post' that returns a single `Post`.
   * @param id - The ID of the post to retrieve, received as a GraphQL argument.
   * @returns A promise that resolves to the `Post` object with the given ID.
   */
  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.postsService.findOne(id);
  }

  /**
   * Resolver field to fetch the User associated with a Post.
   * This resolver is automatically called by GraphQL when the `user` field is queried on a `Post` object.
   * It leverages federation by returning a representation of the User, allowing the gateway to resolve the full User object.
   * @ResolveField(() => User) Decorator indicating this method resolves the `user` field of the Post type.
   * @param post - The parent Post object, automatically passed by GraphQL.
   * @returns An object representing the User, containing the __typename and ID, suitable for GraphQL federation.
   */
  @ResolveField(() => User)
  user(@Parent() post: Post) {
    return { __typename: 'User', id: post.authorId };
  }
}
