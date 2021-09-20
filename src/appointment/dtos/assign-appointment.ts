import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreResult } from 'src/common/dtos/core-result.dto';

@InputType()
export class AssignAppointmentInput {
  @Field(() => Int)
  appointmentId: number;

  @Field(() => Int)
  userId: number;
}

@ObjectType()
export class AssignAppointmentResult extends CoreResult {}
