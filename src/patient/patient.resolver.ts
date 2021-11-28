import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Public } from 'src/auth/meta/public.meta';
import {
  CreatePatientInput,
  CreatePatientResult,
} from './dto/create-patient.dto';
import {
  GetPatientByIdInput,
  GetPatientByIdResult,
} from './dto/get-patient-by-id.dto';
import { GetPatientsInput, GetPatientsResult } from './dto/get-patients.dto';
import {
  SaveInstructionInput,
  SaveInstructionResult,
} from './dto/save-instruction.dto';
import { SaveNotesInput, SaveNotesResult } from './dto/save-notes.dto';
import { PatientService } from './patient.service';

@Resolver()
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @Public()
  @Mutation(() => CreatePatientResult)
  async createPatient(@Args('input') input: CreatePatientInput) {
    try {
      const patient = await this.patientService.createPatient(input);

      return {
        ok: true,
        id: patient.id,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
  @Query(() => GetPatientsResult)
  async getPatients(@Args('input') input: GetPatientsInput) {
    const { patients, hasMore } = await this.patientService.getPatients(input);

    return {
      ok: true,
      patients,
      hasMore,
    };
  }

  @Query(() => GetPatientByIdResult)
  async getPatientById(@Args('input') input: GetPatientByIdInput) {
    const patient = await this.patientService.getPatientById(input);
    return {
      ok: true,
      patient,
    };
  }

  @Mutation(() => SaveInstructionResult)
  async saveInstructions(@Args('input') input: SaveInstructionInput) {
    const patient = await this.patientService.saveInstruction(input);

    return {
      ok: true,
      patient,
    };
  }

  @Mutation(() => SaveNotesResult)
  async saveNotes(@Args('input') input: SaveNotesInput) {
    const patient = await this.patientService.saveNote(input);

    return {
      ok: true,
      patient,
    };
  }
}
