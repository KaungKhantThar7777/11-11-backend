import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';
import { Appointment } from '../entities/appointment.entity';

@InputType()
export class GetAppointmentsInput {
  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  size: number;
}
@ObjectType()
export class GetAppointmentsResult extends CoreResult {
  @Field(() => [Appointment])
  appointments: Appointment[];

  @Field(() => Boolean)
  hasMore: boolean;
}
