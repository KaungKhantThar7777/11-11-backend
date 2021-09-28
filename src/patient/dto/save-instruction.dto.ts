import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { Patient } from '../entities/patient.entity';

@InputType()
export class SaveInstructionInput {
  @Field(() => Int)
  patientId: number;

  @Field(() => String)
  instructions: string;
}

@ObjectType()
export class SaveInstructionResult extends CoreResult {
  @Field(() => Patient)
  patient: Patient;
}
