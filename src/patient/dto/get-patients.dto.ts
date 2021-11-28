import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { Patient } from '../entities/patient.entity';

@InputType()
export class GetPatientsInput {
  @Field(() => Int)
  offset: number;
  @Field(() => Int)
  size: number;
}
@ObjectType()
export class GetPatientsResult extends CoreResult {
  @Field(() => [Patient])
  patients: Patient[];

  @Field(() => Boolean)
  hasMore: boolean;
}
