import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(taskData: CreateTaskDto, user: User): Promise<Task> {
    const task = this.taskRepository.create({
      ...taskData,
      user, // Assign the user to the task
    });
    return await this.taskRepository.save(task); // Pass the task object to save
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(query: object): Promise<Task> {
    return await this.taskRepository.findOne(query);
  }
}
