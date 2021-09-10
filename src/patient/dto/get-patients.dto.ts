import { Field, ObjectType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { Patient } from '../entities/patient.entity';

@ObjectType()
export class GetPatientsResult extends CoreResult {
  @Field(() => [Patient])
  patients: Patient[];
}
