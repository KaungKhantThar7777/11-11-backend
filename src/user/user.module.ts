import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Appointment]), AuthModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
