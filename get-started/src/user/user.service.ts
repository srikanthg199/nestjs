import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { generateHash } from 'src/utils/auth.utils';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = await generateHash(createUserDto.password);
    createUserDto.password = hashPassword;
    return this.userRepository.create(createUserDto);
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await this.userRepository.delete(id);
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<User> {
    await this.getUserById(id);
    await this.userRepository.update(id, updateData);
    return this.getUserById(id);
  }

  // Get user by email via body
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}
