import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { Patient } from '../entities/patient.entity';

@InputType()
export class CreatePatientInput extends OmitType(
  Patient,
  ['id', 'appointments'],
  InputType,
) {}

@ObjectType()
export class CreatePatientResult extends CoreResult {
  @Field(() => String)
  id: string;
}
