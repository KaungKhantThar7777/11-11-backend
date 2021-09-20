import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { Department, User } from '../entities/user.entity';

@InputType()
export class GetUsersInput {
  @Field(() => Department)
  department: Department;
}

@ObjectType()
export class GetUsersResult extends CoreResult {
  @Field(() => [User])
  users: User[];
}
