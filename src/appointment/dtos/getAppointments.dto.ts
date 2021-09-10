import { Field, ObjectType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { Appointment } from '../entities/appointment.entity';

@ObjectType()
export class AppointmentsResult extends CoreResult {
  @Field(() => [Appointment])
  appointments: Appointment[];
}
