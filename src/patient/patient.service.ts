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
    console.log(input);
    patient = this.patients.create(input);

    await this.patients.save(patient);
    return patient;
  }
  async getPatients(input: GetPatientsInput) {
    const { offset, size } = input;
    const patients = await this.patients.find({
      relations: ['appointments'],
      skip: offset,
      take: size + 1,
    });

    return {
      patients: patients.slice(0, size),
      hasMore: patients.length > size,
    };
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
