import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientInput } from './dto/create-patient.dto';
import { GetPatientByIdInput } from './dto/get-patient-by-id.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private readonly patients: Repository<Patient>,
  ) {}
  async createPatient(input: CreatePatientInput) {
    let patient: Patient;

    patient = await this.patients.findOne({ email: input.email });
    if (patient) {
      return patient;
    }
    patient = this.patients.create(input);

    await this.patients.save(patient);
    return patient;
  }
  async getPatients() {
    const patients = await this.patients.find();
    return patients;
  }
  async getPatientById({ id }: GetPatientByIdInput) {
    const patient = await this.patients.findOne({
      where: {
        id,
      },
      relations: ['appointments'],
    });
    return patient;
  }
}
