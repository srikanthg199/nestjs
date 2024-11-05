import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string; //TODO: Need to hash

  @Column({ default: false })
  isActive: boolean;

  @Column()
  age: number;

  // Add more columns as needed
}
