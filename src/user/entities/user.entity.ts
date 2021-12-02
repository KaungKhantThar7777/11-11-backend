import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import * as argon2 from 'argon2';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';

export enum Department {
  PR = 'pr',
  MST = 'mst',
}
registerEnumType(Department, {
  name: 'Department',
});
export enum UserRole {
  leader = 'Leader',
  coleader = 'Co-Leader',
  officer = 'Officer',
  member = 'Member',
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
  @Column()
  department: Department;

  @Field(() => UserRole)
  @Column()
  role: UserRole;

  @Field()
  @Column({ unique: true })
  member_id: string;

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, (appointment) => appointment.counsellor)
  appointments: Appointment[];
}
