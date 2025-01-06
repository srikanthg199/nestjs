import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(filter: object): Promise<User> {
    return this.userRepository.findOne(filter);
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: string, updateData: Partial<User>): Promise<void> {
    await this.userRepository.update(id, updateData);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async saveData(data: User): Promise<User> {
    return this.userRepository.save(data);
  }
}
