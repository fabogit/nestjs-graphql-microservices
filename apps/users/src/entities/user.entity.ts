import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';

/**
 * GraphQL ObjectType representing a User.
 * Defines the structure of a User object in the GraphQL schema.
 * This type is marked with the `@key` directive, indicating it is a key entity in a federated GraphQL schema and can be resolved by other services in the supergraph.
 * @ObjectType Decorator marking this class as a GraphQL ObjectType, making it available in the GraphQL schema.
 * @Directive('@key(fields: "id")') GraphQL directive from Apollo Federation, specifying that the 'id' field is the primary key for this entity and can be used to resolve this entity from other subgraphs in a federated schema.
 */
@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  /**
   * The unique identifier for the user.
   * Marked as a GraphQL ID type to represent a unique identifier.
   *  @Field(() => ID, { description: 'id' }) Decorator indicating this property is a GraphQL field of type ID.
   *  `description` provides a human-readable explanation of this field in the GraphQL schema.
   * @type {string}
   */
  @Field(() => ID, { description: 'id' })
  id: string;

  /**
   * The email address of the user.
   * Represents the user's email, a common identifier and contact method.
   * @Field() Decorator indicating this property is a GraphQL field of type String (inferred).
   * @type {string}
   */
  @Field()
  email: string;

  /**
   * The password for the user account.
   * Represents the user's password for authentication purposes.
   * **Note:** In a real-world application, storing passwords directly in a GraphQL schema is highly discouraged. This is likely a simplified example. Passwords should be handled with proper security measures like hashing and should ideally not be exposed through the GraphQL schema.
   * @Field() Decorator indicating this property is a GraphQL field of type String (inferred).
   * @type {string}
   */
  @Field()
  password: string;
}
