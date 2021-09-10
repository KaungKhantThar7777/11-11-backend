import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Patient {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  phone_number: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column()
  @Field(() => String)
  gender: string;

  @Column()
  @Field()
  maritalStatus: string;

  @Column({ type: 'boolean' })
  @Field(() => Boolean)
  haveChild: boolean;

  @Column({ default: 0 })
  @Field(() => Int, { nullable: true })
  childrenCount: number;

  @Column()
  @Field()
  emergencyPerson: string;

  @Column()
  @Field()
  emergencyPhone: string;

  @Column()
  @Field()
  emergencyRelationship: string;
}
