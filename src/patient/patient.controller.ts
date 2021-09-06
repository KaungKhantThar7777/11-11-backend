import { Controller, Post } from '@nestjs/common';

@Controller('patients')
export class PatientController {
  @Post()
  createAppoinment() {
    return 'hello create appointment';
  }
}
