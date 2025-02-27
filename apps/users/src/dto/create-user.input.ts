import { InputType, Field } from '@nestjs/graphql';

/**
 * Input type for creating a new user.
 * This input type defines the data structure required when creating a user via GraphQL mutations.
 * It includes fields for the user's ID, email, and password.
 * @InputType() Decorator marking this class as a GraphQL InputType. This makes it usable as input for GraphQL mutations and queries.
 */
@InputType()
export class CreateUserInput {
  /**
   * The unique identifier for the user.
   * @Field() Decorator indicating this property is a GraphQL field.
   * @type {string}
   */
  @Field()
  id: string;

  /**
   * The email address of the user.
   * @Field() Decorator indicating this property is a GraphQL field.
   * @type {string}
   */
  @Field()
  email: string;

  /**
   * The password for the user account.
   * @Field() Decorator indicating this property is a GraphQL field.
   * @type {string}
   */
  @Field()
  password: string;
}
