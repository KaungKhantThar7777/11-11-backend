import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/patient/entities/patient.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AssignAppointmentInput } from './dtos/assign-appointment';
import { CreateAppointmentInput } from './dtos/create-appointment.dto';
import { GetAppointmentsInput } from './dtos/getAppointments.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointments: Repository<Appointment>,
    @InjectRepository(Patient) private readonly patients: Repository<Patient>,
    @InjectRepository(Patient) private readonly users: Repository<User>,
  ) {}
  async getAppointments({ offset, size = 10 }: GetAppointmentsInput) {
    const appointments = await this.appointments.find({
      relations: ['patient', 'counsellor'],
      where: { isTaken: false },
      order: {
        createdAt: 'DESC',
      },
      take: size + 1,
      skip: offset,
    });

    return {
      appointments: appointments.slice(0, size),
      hasMore: appointments.length > size,
    };
  }
  async createAppointment(input: CreateAppointmentInput) {
    const patient = await this.patients.findOne({
      where: {
        email: input.email,
      },
    });
    if (!patient) {
      throw new Error('No patient found');
    }
    const appointment = this.appointments.create({
      ...input,
      patient,
    });
    await this.appointments.save(appointment);
    return appointment;
  }

  async assignAppointment({ appointmentId, userId }: AssignAppointmentInput) {
    const appointment = await this.appointments.findOne(appointmentId);
    const user = await this.users.findOne(userId);

    appointment.counsellor = user;
    appointment.isTaken = true;

    this.appointments.save(appointment);
  }
}
