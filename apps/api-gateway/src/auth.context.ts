import { UnauthorizedException } from '@nestjs/common';

export const authContext = ({ req }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (req.headers?.authorization) {
    // validate a valid JWT and return the associated user
    return { user: { id: 'mock value for user id' } };
  }
  throw new UnauthorizedException();
};
