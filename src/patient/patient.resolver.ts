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
import { GetPatientsResult } from './dto/get-patients.dto';
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
  async getPatients() {
    const patients = await this.patientService.getPatients();
    return {
      ok: true,
      patients,
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
}
