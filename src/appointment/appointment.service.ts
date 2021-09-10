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
  async createAppointment({
    hasExperience,
    bestDay,
    bestTime,
    chronicIllness,
    agree_rule,
    reasons,
    ...patientInput
  }: CreateAppointmentInput) {
    let patient = await this.patients.findOne({
      where: { email: patientInput.email },
    });

    if (!patient) {
      patient = this.patients.create({
        ...patientInput,
      });
      await this.patients.save(patient);
    }
    const appointment = this.appointments.create({
      hasExperience,
      bestDay,
      bestTime,
      agree_rule,
      chronicIllness,
      reasons,
      patient,
    });
    await this.appointments.save(appointment);
    return appointment;
  }
}
