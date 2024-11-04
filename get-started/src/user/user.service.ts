import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async deleteUser(id: string): Promise<unknown> {
    await this.getUserById(id);
    await this.userRepository.delete(id);
    return { status: 'success', message: 'User deleted successfully' };
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<User> {
    await this.getUserById(id);
    await this.userRepository.update(id, updateData);
    return this.getUserById(id);
  }
}
