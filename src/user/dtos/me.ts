import { Field, ObjectType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { User } from '../entities/user.entity';

@ObjectType()
export class MeResult extends CoreResult {
  @Field(() => User)
  user: User;
}
