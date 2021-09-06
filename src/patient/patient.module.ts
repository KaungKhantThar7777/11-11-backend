import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientResolver } from './patient.resolver';

@Module({
  providers: [PatientResolver],
  controllers: [PatientController],
})
export class PatientModule {}
