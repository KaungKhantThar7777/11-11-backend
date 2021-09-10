import { Args, Resolver, Query } from '@nestjs/graphql';
import {
  GetPatientByIdInput,
  GetPatientByIdResult,
} from './dto/get-patient-by-id.dto';
import { GetPatientsResult } from './dto/get-patients.dto';
import { PatientService } from './patient.service';

@Resolver()
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

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
