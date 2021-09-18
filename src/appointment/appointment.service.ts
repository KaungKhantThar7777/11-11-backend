import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/patient/entities/patient.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentInput } from './dtos/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointments: Repository<Appointment>,
    @InjectRepository(Patient) private readonly patients: Repository<Patient>,
  ) {}
  async getAppointments() {
    const appointments = await this.appointments.find({
      relations: ['patient'],
    });

    return appointments;
  }
  async createAppointment(input: CreateAppointmentInput) {
    const patient = await this.patients.findOne(input.patientId);
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
}
