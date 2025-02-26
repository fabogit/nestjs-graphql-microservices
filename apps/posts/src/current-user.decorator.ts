/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (_data: any, ctx: GqlExecutionContext) => {
    try {
      const headers = ctx.getArgs()[2].req.headers;
      if (headers.user) {
        return JSON.parse(headers.user);
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  },
);
