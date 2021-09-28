import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { Patient } from '../entities/patient.entity';

@InputType()
export class SaveNotesInput {
  @Field(() => Int)
  patientId: number;

  @Field(() => String)
  notes: string;
}

@ObjectType()
export class SaveNotesResult extends CoreResult {
  @Field(() => Patient)
  patient: Patient;
}
