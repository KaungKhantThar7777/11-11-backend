import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Appointment extends CoreEntity {
  @Column({ default: false })
  @Field(() => Boolean)
  isTaken: boolean;

  @Column({ type: 'boolean' })
  @Field(() => Boolean)
  hasExperience: boolean;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  session: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  day: string;

  @Column()
  @Field()
  reasons: string;

  @Column()
  @Field()
  chronicIllness: string;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  @Field(() => Patient)
  patient: Patient;

  @ManyToOne(() => User, (user) => user.appointments)
  @Field(() => User, { nullable: true })
  counsellor: User;
}
