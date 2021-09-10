import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { Patient } from '../entities/patient.entity';

@InputType()
export class GetPatientByIdInput {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class GetPatientByIdResult extends CoreResult {
  @Field(() => Patient, { nullable: true })
  patient: Patient;
}
