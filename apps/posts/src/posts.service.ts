import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entities/post.entity';

/**
 * Injectable service responsible for managing post entities.
 * This service provides methods for creating, retrieving, and filtering post data.
 * It maintains an in-memory array to simulate a data store.
 */
@Injectable()
export class PostsService {
  /**
   * Private array to store Post objects in memory.
   * Serves as a simple data store for this service.
   * @private
   * @type {Post[]}
   */
  private readonly posts: Post[] = [];

  /**
   * Creates a new post and adds it to the in-memory store.
   * @param {CreatePostInput} createPostInput - Data transfer object containing the details of the post to be created.
   * @returns {Post} The newly created `Post` object.
   */
  create(createPostInput: CreatePostInput): Post {
    this.posts.push(createPostInput);
    return createPostInput;
  }

  /**
   * Retrieves all posts from the in-memory store.
   * @returns {Post[]} An array containing all `Post` objects currently stored.
   */
  findAll(): Post[] {
    return this.posts;
  }

  /**
   * Finds a single post by its unique ID.
   * @param {string} id - The unique identifier of the post to retrieve.
   * @returns {Post | undefined} The `Post` object matching the provided ID, or undefined if no match is found.
   */
  findOne(id: string): Post | undefined {
    return this.posts.find((post) => post.id === id);
  }

  /**
   * Retrieves all posts authored by a specific user ID.
   * @param {string} authorId - The unique identifier of the author for whom to retrieve posts.
   * @returns {Post[]} An array containing `Post` objects authored by the user with the given ID.
   */
  forAuthor(authorId: string): Post[] {
    return this.posts.filter((post) => post.authorId === authorId);
  }
}
