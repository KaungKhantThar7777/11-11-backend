import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { User } from '../entities/user.entity';

@InputType()
export class SignUpInput extends OmitType(
  User,
  ['id', 'appointments'],
  InputType,
) {}

@ObjectType()
export class SignUpResult extends CoreResult {}
