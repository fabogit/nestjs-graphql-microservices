import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID, { description: 'id' })
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
