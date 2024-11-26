import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string; // Need to hash

  @Column({ default: false })
  isActive: boolean;

  @Column()
  age: number;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
