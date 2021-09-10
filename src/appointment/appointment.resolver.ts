import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NEW_PENDING_APPOINTMENT, PUB_SUB } from 'src/common/common.contstants';
import { AppointmentService } from './appointment.service';
import { AppointmentsResult } from './dtos/getAppointments.dto';
import {
  CreateAppointmentInput,
  CreateAppointmentResult,
} from './dtos/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Resolver()
export class AppointmentResolver {
  constructor(
    private readonly appointmentService: AppointmentService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Query(() => AppointmentsResult)
  async getAppointments(): Promise<AppointmentsResult> {
    const appointments = await this.appointmentService.getAppointments();
    return {
      ok: true,
      appointments,
    };
  }

  @Mutation(() => CreateAppointmentResult)
  async createAppointment(@Args('input') input: CreateAppointmentInput) {
    try {
      const appointment = await this.appointmentService.createAppointment(
        input,
      );
      this.pubSub.publish(NEW_PENDING_APPOINTMENT, {
        newAppointment: appointment,
      });
      return {
        ok: true,
        appointment,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  @Subscription(() => Appointment)
  newAppointment() {
    return this.pubSub.asyncIterator(NEW_PENDING_APPOINTMENT);
  }
}
