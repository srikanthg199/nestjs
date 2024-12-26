import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_settings' })
@ObjectType()
export class UserSettings {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  user_id: number;

  @Column()
  @Field(() => Boolean, { defaultValue: true })
  notifications: boolean;

  @Column()
  @Field(() => String, { defaultValue: 'en' })
  language: string;

  @Column()
  @Field(() => Boolean, { defaultValue: false })
  darkMode: boolean;
}
