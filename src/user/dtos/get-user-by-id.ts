import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { User } from '../entities/user.entity';

@InputType()
export class GetUserByIdInput {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class GetUserByIdResult extends CoreResult {
  @Field(() => User, { nullable: true })
  user: User;
}
