import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.entity';

/**
 * GraphQL ObjectType representing a Post.
 * Defines the structure of a Post object in the GraphQL schema, including its fields and their types.
 * @ObjectType Decorator marking this class as a GraphQL `ObjectType`, making it available in the GraphQL schema.
 */
@ObjectType()
export class Post {
  /**
   * The unique identifier for the post.
   * Marked as a GraphQL ID type.
   * @Field(() => ID, { description: 'id' }) Decorator indicating this property is a GraphQL field of type ID.
   * @type {string}
   */
  @Field(() => ID, { description: 'id' })
  id: string;

  /**
   * The main content or text body of the post.
   * @Field() Decorator indicating this property is a GraphQL field of type String (inferred).
   * @type {string}
   */
  @Field()
  body: string;

  /**
   * The unique identifier of the user who authored the post.
   * This field is used to link the post to its author.
   * @Field() Decorator indicating this property is a GraphQL field of type String (inferred).
   * @type {string}
   */
  @Field()
  authorId: string;

  /**
   * The User entity representing the author of the post.
   * This field establishes a relationship to the User type in the GraphQL schema.
   * It's optional, denoted by the `?`, and may not always be populated in every query.
   * @Field(() => User) Decorator indicating this property is a GraphQL field of type User.
   * @type {User | undefined}
   */
  @Field(() => User)
  user?: User;
}
