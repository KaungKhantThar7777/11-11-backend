import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUsersInput } from './dtos/get-users';
import { SignUpInput } from './dtos/signup.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async signup(input: SignUpInput) {
    const user = await this.users.save(this.users.create(input));
    return user;
  }

  async findOne(email: string) {
    const user = await this.users.findOne({ email });
    return user;
  }

  async getUsersByDepartment({ department }: GetUsersInput) {
    const users = await this.users.find({
      where: {
        department,
      },
    });

    return users;
  }

  findById(id: string) {
    return this.users.findOne(id);
  }
}
