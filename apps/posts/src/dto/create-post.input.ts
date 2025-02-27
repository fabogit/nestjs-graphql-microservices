import { InputType, Field } from '@nestjs/graphql';

/**
 * Input type for creating a new post.
 * This input type is used to define the structure of data expected when creating a new post via GraphQL mutations.
 * It includes fields for the post's ID, body content, and the author's ID.
 * @InputType Decorator marking this class as a GraphQL `InputType`. This allows it to be used as input in GraphQL mutations and queries.
 */
@InputType()
export class CreatePostInput {
  /**
   * The unique identifier for the post.
   * @Field() Decorator indicating this property is a GraphQL field.
   * @type {string}
   */
  @Field()
  id: string;

  /**
   * The main content or text body of the post.
   * @Field() Decorator indicating this property is a GraphQL field.
   * @type {string}
   */
  @Field()
  body: string;

  /**
   * The unique identifier of the user who authored the post.
   * This field establishes the relationship between a post and its author.
   * @Field() Decorator indicating this property is a GraphQL field.
   * @type {string}
   */
  @Field()
  authorId: string;
}
