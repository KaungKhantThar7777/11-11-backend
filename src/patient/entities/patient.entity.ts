import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Patient extends CoreEntity {
  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  facebook_name: string;

  @Column()
  @Field(() => String)
  phone_number: string;

  @Column()
  @Field()
  email: string;

  @Column({ type: 'boolean' })
  @Field(() => Boolean)
  hasExperience: boolean;

  @Column()
  @Field(() => Int)
  age: number;

  @Column()
  @Field(() => String)
  gender: string;

  @Column({ nullable: true })
  @Field(() => String)
  religion: string;

  @Column({ nullable: true })
  @Field(() => String)
  educationBusiness: string;

  @Column()
  @Field()
  maritalStatus: string;

  @Column({ type: 'boolean' })
  @Field(() => Boolean)
  haveChild: boolean;

  @Column({ default: 0 })
  @Field(() => Int, { nullable: true })
  childrenCount: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  emergencyPerson?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  emergencyPhone?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  emergencyRelationship: string;

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @Field(() => String, { nullable: true })
  @Column({ type: 'longtext', nullable: true })
  instructions: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'longtext', nullable: true })
  notes: string;
}
