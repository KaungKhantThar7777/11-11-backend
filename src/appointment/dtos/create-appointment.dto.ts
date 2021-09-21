import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { Appointment } from '../entities/appointment.entity';

@InputType()
export class CreateAppointmentInput extends PickType(
  Appointment,
  ['hasExperience', 'chronicIllness', 'reasons'],
  InputType,
) {
  @Field(() => String)
  email: string;
}

@ObjectType()
export class CreateAppointmentResult extends CoreResult {
  @Field(() => Appointment, { nullable: true })
  appointment: Appointment;
}
