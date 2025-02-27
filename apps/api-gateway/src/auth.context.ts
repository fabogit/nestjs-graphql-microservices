import { UnauthorizedException } from '@nestjs/common';

/**
 * Context function for Apollo Gateway to handle authentication.
 * This function extracts the `authorization` header from the incoming `request`.
 * If the `authorization` header is present, it assumes the user is authenticated and returns a mock `user` object in the context.
 * If the `authorization` header is missing, it throws an `UnauthorizedException`, indicating that authentication is required.
 *
 * @param req - The Express `request` object.
 * @returns An object containing the `user` context. In this mock implementation, it always returns a `user` object with a predefined 'mock value for user id'.
 * @throws If the `authorization` header is not present in the `request` headers, indicating that the user is not authenticated.
 */
export const authContext = ({ req }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (req.headers?.authorization) {
    // validate a valid JWT and return the associated user
    return { user: { id: 'mock value for user id' } };
  }
  throw new UnauthorizedException();
};
