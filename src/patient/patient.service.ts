import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientInput } from './dto/create-patient.dto';
import { GetPatientByIdInput } from './dto/get-patient-by-id.dto';
import { GetPatientsInput } from './dto/get-patients.dto';
import { SaveInstructionInput } from './dto/save-instruction.dto';
import { SaveNotesInput } from './dto/save-notes.dto';
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
  async getPatients(input: GetPatientsInput) {
    const results = await this.patients.findAndCount({
      relations: ['appointments'],
      skip: input.offset,
      take: input.limit,
    });

    return results;
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

  async saveInstruction({ instructions, patientId }: SaveInstructionInput) {
    const patient = await this.patients.findOne(patientId);
    patient.instructions = instructions;

    return await this.patients.save(patient);
  }

  async saveNote({ notes, patientId }: SaveNotesInput) {
    const patient = await this.patients.findOne(patientId);
    patient.notes = notes;

    return await this.patients.save(patient);
  }
}
