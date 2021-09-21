import { Field, InputType, Int, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { User } from '../entities/user.entity';

@InputType()
export class SignUpInput extends OmitType(
  User,
  ['id', 'appointments', 'createdAt', 'updatedAt'],
  InputType,
) {}

@ObjectType()
export class SignUpResult extends CoreResult {
  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => Int, { nullable: true })
  id?: number;
}
