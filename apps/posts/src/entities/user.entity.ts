import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Post } from './post.entity';

/**
 * GraphQL ObjectType representing a User.
 * Defines the structure of a User object in the GraphQL schema, including its fields and their types.
 * This type is marked with the `@key` directive, indicating it's a key entity in a federated GraphQL schema.
 * @ObjectType Decorator marking this class as a GraphQL ObjectType, making it available in the GraphQL schema.
 * @Directive('@key(fields: "id")') GraphQL directive indicating that the 'id' field is the primary key for this entity in a federated context.
 */
@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  /**
   * The unique identifier for the user.
   * Marked as a GraphQL ID type and designated as the key field via the `@key` directive.
   * @Field(() => ID, { description: 'id' }) Decorator indicating this property is a GraphQL field of type ID.
   * @type {string}
   */
  @Field(() => ID, { description: 'id' })
  id: string;

  /**
   * An array of Post entities associated with the user.
   * This field establishes a relationship to the Post type in the GraphQL schema, representing the user's posts.
   * It's optional, denoted by the `?`, and may not always be populated in every query, especially in a federated context.
   * @Field(() => [Post]) Decorator indicating this property is a GraphQL field that resolves to a list of Post objects.
   * @type {Post[] | undefined}
   */
  @Field(() => [Post])
  posts?: Post[];
}
