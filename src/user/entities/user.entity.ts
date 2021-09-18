import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import * as argon2 from 'argon2';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Department {
  Esd = 'esd',
  Media = 'media',
  Research = 'research',
  PrCommunity = 'pr_community',
  OrganizerSupport = 'organizer_support',
}
registerEnumType(Department, {
  name: 'Department',
});
export enum UserRole {
  DepartmentHead = 'department_head',
  Member = 'member',
  Assistant = 'assistant',
  Guest = 'guest',
}
registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  async verifyPassword(password: string) {
    return argon2.verify(this.password, password);
  }

  @Field()
  @Column()
  phone_number: string;

  @Field(() => Department)
  @Column({ enum: Department, enumName: 'Department' })
  department: Department;

  @Field(() => UserRole)
  @Column({ enum: UserRole, enumName: 'UserRole' })
  role: UserRole;

  @Field()
  @Column()
  member_code: string;

  @OneToMany(() => Appointment, (appointment) => appointment.counsellor)
  appointments: Appointment[];
}
