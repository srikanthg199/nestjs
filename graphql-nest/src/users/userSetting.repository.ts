import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSettings } from 'src/graphql/models/Setting';
import { User } from 'src/graphql/models/User';
import { CreateUserSettingsInput } from 'src/graphql/utils/userSetting';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettingRepository {
  constructor(
    @InjectRepository(UserSettings)
    private readonly userSettingRepository: Repository<UserSettings>,
  ) {}

  async findAll(filter?: object): Promise<UserSettings[]> {
    return await this.userSettingRepository.find(filter);
  }

  async findOne(filter: object): Promise<UserSettings> {
    return this.userSettingRepository.findOneBy(filter);
  }

  async create(
    createUserSettingsInput: CreateUserSettingsInput,
  ): Promise<UserSettings> {
    const user = this.userSettingRepository.create(createUserSettingsInput);
    return this.userSettingRepository.save(user);
  }
}
