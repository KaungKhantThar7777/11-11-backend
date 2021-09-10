import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPatientByIdInput } from './dto/get-patient-by-id.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private readonly patients: Repository<Patient>,
  ) {}
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
