import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => ID, { description: 'id' })
  id: string;

  @Field()
  body: string;

  @Field()
  authorId: string;
}
