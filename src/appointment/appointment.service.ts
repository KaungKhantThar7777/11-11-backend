import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTransport } from 'nodemailer';
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
    @InjectRepository(User) private readonly users: Repository<User>,
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
      where: [
        {
          email: input.emailOrId,
        },
        {
          id: input.emailOrId,
        },
      ],
      relations: ['appointments'],
    });

    if (!patient) {
      throw new Error('No patient found');
    }

    if (patient.appointments?.length) patient.hasExperience = true;
    await this.patients.save(patient);
    const appointment = this.appointments.create({
      ...input,
      patient,
    });
    await this.appointments.save(appointment);
    return appointment;
  }

  async assignAppointment({
    appointmentId,
    userId,
    day,
    session,
  }: AssignAppointmentInput) {
    const appointment = await this.appointments.findOne(appointmentId);
    const user = await this.users.findOne(userId);
    console.log(user);

    appointment.counsellor = user;
    appointment.day = day;
    appointment.session = session;
    appointment.isTaken = true;

    const transportOptions = {
      pool: true,
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT,
      secure: true,
      requireTLS: false,
      ignoreTLS: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    };
    // create reusable transporter object using the default SMTP transport
    const transporter = createTransport(transportOptions);

    // send mail with defined transport object
    await transporter.sendMail({
      from: '"11;11 Campaign Portal" <portal@1111campaign.co.uk>', // sender address
      to: user.email, // list of receivers
      subject: 'Appointment Assinged!', // Subject line
      text: 'From 11;11 Campaign,', // plain text body
      html: `<b>Hello ${user.username}!</b>
      <p>We send this email to inform you that a PR team member has 
      assigned you with this appointment (Appointment ID: ${appointmentId}). 
      You can find the patient details <a href="http://1111campaign.co.uk/patient-profile/${appointment.patient.id}">here</a></p><br/>
      <quote><small>This is an automatic email from Eleven Eleven Campaign.
      Please do not try to reply to this email address. Your email will be 
      rejected in case you replied to this address.</small></quote>`, // html body
    });

    this.appointments.save(appointment);
  }
}
