import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { Patient } from 'src/patient/entities/patient.entity';
import { Appointment } from '../entities/appointment.entity';

@InputType()
export class CreateAppointmentInput extends OmitType(
  Patient,
  ['id'],
  InputType,
) {
  @Field(() => Boolean)
  hasExperience: boolean;

  @Field()
  bestTime: string;

  @Field()
  bestDay: string;

  @Field()
  reasons: string;

  @Field()
  chronicIllness: string;

  @Field(() => Boolean)
  agree_rule: boolean;
}

@ObjectType()
export class CreateAppointmentResult extends CoreResult {
  @Field(() => Appointment, { nullable: true })
  appointment: Appointment;
}
