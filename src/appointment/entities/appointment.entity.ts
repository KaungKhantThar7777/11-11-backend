import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Appointment extends CoreEntity {
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

  @ManyToOne(() => User, (user) => user.appointments)
  @Field(() => User, { nullable: true })
  counsellor: User;
}
