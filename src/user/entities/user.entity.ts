import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import * as argon2 from 'argon2';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';

export enum Department {
  EsdCounselling = 'esd_counselling',
  EsdMeditation = 'esd_meditation',
  EsdYoga = 'esd_yoga',
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
export class User extends CoreEntity {
  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

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
  @Column()
  department: Department;

  @Field(() => UserRole)
  @Column()
  role: UserRole;

  @Field()
  @Column()
  member_id: string;

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, (appointment) => appointment.counsellor)
  appointments: Appointment[];
}
