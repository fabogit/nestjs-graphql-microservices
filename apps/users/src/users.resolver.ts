import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

/**
 * Resolver for handling GraphQL queries and mutations related to `User` entities.
 * This resolver is responsible for providing the data and operations for the `User` type in the GraphQL schema,
 * including creating users, finding users, and resolving references for GraphQL Federation.
 * @Resolver(() => User) Decorator indicating that this class resolves fields for the User GraphQL type.
 */
@Resolver(() => User)
export class UsersResolver {
  /**
   * Constructor for UsersResolver.
   * @param usersService - Service responsible for user-related business logic.
   * Injected by NestJS dependency injection.
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Mutation to create a new user.
   * @Mutation(() => User) Decorator indicating this method is a GraphQL mutation that returns a User.
   * @param createUserInput - Input data for creating a new user, received as GraphQL arguments.
   * @returns A promise that resolves to the newly created User object.
   */
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  /**
   * Query to retrieve all users.
   * @Query(() => [User], { name: 'users' }) Decorator indicating this method is a GraphQL query named 'users' that returns a list of User.
   * @returns A promise that resolves to an array of User objects.
   */
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Query to retrieve a single user by their ID.
   * @Query(() => User, { name: 'user' }) Decorator indicating this method is a GraphQL query named 'user' that returns a single User.
   * @param id - The ID of the user to retrieve, received as a GraphQL argument.
   * @returns A promise that resolves to the User object with the given ID.
   */
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Resolver for the User reference in a federated GraphQL schema.
   * This method is used by Apollo Gateway to resolve a User object when it's referenced from another service.
   * It expects a `reference` object with `__typename` and `id` properties, and uses the `id` to fetch the User from the UsersService.
   * @ResolveReference() Decorator indicating this method is a resolver for a type reference in GraphQL Federation.
   * @param reference - The reference object containing the `__typename` and `id` of the User.
   * @param reference.id - The ID of the User to resolve.
   * @param reference.__typename - The typename, expected to be 'User'.
   * @returns A promise that resolves to the User object if found, or undefined otherwise.
   */
  @ResolveReference()
  resolveRefarence(reference: { __typename: string; id: string }) {
    return this.usersService.findOne(reference.id);
  }
}
