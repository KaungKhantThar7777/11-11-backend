import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginResult extends CoreResult {
  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => Int, { nullable: true })
  id?: string;
}
