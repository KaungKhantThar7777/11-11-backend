import { Field, ObjectType } from '@nestjs/graphql';
import { Patient } from 'src/patient/entities/patient.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ type: 'boolean' })
  @Field(() => Boolean)
  hasExperience: boolean;

  @Column()
  @Field()
  bestTime: string;

  @Column()
  @Field()
  bestDay: string;

  @Column()
  @Field()
  reasons: string;

  @Column()
  @Field()
  chronicIllness: string;

  @Column({ type: 'boolean' })
  @Field(() => Boolean)
  agree_rule: boolean;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  @Field(() => Patient)
  patient: Patient;
}
