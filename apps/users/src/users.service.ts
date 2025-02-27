import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

/**
 * Injectable service responsible for managing user entities.
 * This service provides methods for creating, retrieving, and managing user data.
 * It maintains an in-memory array to simulate a data store for users.
 */
@Injectable()
export class UsersService {
  /**
   * Private array to store `User` objects in memory.
   * Serves as a simple data store for this service.
   * @private
   * @readonly
   * @type {User[]}
   */
  private readonly users: User[] = [];

  /**
   * Creates a new user and adds it to the in-memory store.
   * @param {CreateUserInput} createUserInput - Data transfer object containing the details of the user to be created.
   * @returns {User} The newly created `User` object.
   */
  create(createUserInput: CreateUserInput): User {
    this.users.push(createUserInput);
    return createUserInput;
  }

  /**
   * Retrieves all users from the in-memory store.
   * @returns {User[]} An array containing all `User` objects currently stored.
   */
  findAll(): User[] {
    return this.users;
  }

  /**
   * Finds a single user by their unique ID.
   * @param {string} id - The unique identifier of the user to retrieve.
   * @returns {User | undefined} The `User` object matching the provided ID, or undefined if no match is found.
   */
  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
