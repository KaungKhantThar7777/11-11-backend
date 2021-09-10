import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/patient/entities/patient.entity';
import { AppointmentResolver } from './appointment.resolver';
import { AppointmentService } from './appointment.service';
import { Appointment } from './entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Appointment])],
  providers: [AppointmentResolver, AppointmentService],
})
export class AppointmentModule {}
