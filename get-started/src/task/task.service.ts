import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  create(createTaskDto: CreateTaskDto, user) {
    return this.taskRepository.create(createTaskDto, user);
  }

  findAll() {
    return this.taskRepository.findAll();
  }

  findOne(id: string) {
    return this.taskRepository.findOne({ where: { id }, relations: ['user'] });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
