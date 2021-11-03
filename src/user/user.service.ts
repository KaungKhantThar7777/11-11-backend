import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Repository } from 'typeorm';
import { GetUsersInput } from './dtos/get-users';
import { SignUpInput } from './dtos/signup.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Appointment)
    private readonly appointments: Repository<Appointment>,
  ) {}

  async signup(input: SignUpInput) {
    const user = await this.users.save(this.users.create(input));
    return user;
  }

  async findOne(email: string) {
    const user = await this.users.findOne({ email });
    return user;
  }

  async getUsersByDepartment({ department, limit, offset }: GetUsersInput) {
    const users = await this.users.find({
      where: {
        department,
      },
      skip: offset,
      take: limit,
    });

    return users;
  }

  async findById(id: string) {
    const user = await this.users.findOne(id);
    const appointments = await this.appointments.find({
      where: {
        counsellorId: user.id,
      },
    });
    user.appointments = appointments;
    return user;
  }
}
