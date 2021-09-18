import { Field, InputType, Int, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { Appointment } from '../entities/appointment.entity';

@InputType()
export class CreateAppointmentInput extends OmitType(
  Appointment,
  ['id', 'patient', 'counsellor'],
  InputType,
) {
  @Field(() => Int)
  patientId: number;
}

@ObjectType()
export class CreateAppointmentResult extends CoreResult {
  @Field(() => Appointment, { nullable: true })
  appointment: Appointment;
}
