import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSettings } from './Setting';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  display_name: string;

  @OneToOne(() => UserSettings)
  @JoinColumn()
  @Field(() => UserSettings, { nullable: true })
  settings: UserSettings;
}
