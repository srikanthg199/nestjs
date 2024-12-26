import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/graphql/models/User';
import { CreateUserInput } from 'src/graphql/utils/createUserInput';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  getUserById(id: number): Promise<User> {
    try {
      return this.userRepository.findOne({ id });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  createUser(createUserData: CreateUserInput): Promise<User> {
    try {
      return this.userRepository.create(createUserData);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }
}
