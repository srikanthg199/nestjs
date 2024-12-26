import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(filter?: object): Promise<User[]> {
    return await this.userRepository.find(filter);
  }

  async findOne(filter: object): Promise<User> {
    return this.userRepository.findOneBy(filter);
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }
}

//   async saveData(data) {
//     return this.userRepository.save(data);
//   }
