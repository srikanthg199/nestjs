import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserSettingRepository } from './userSetting.repository';
import { CreateUserSettingsInput } from 'src/graphql/utils/userSetting';
import { UserSettings } from 'src/graphql/models/Setting';
import { UserRepository } from './user.repository';

@Injectable()
export class UserSettingService {
  constructor(
    private readonly userSettingRepository: UserSettingRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getUsersSettings(): Promise<UserSettings[]> {
    try {
      return await this.userSettingRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  getUserSettingsById(id: number): Promise<UserSettings> {
    try {
      return this.userSettingRepository.findOne({ id });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async createUserSettings(
    payload: CreateUserSettingsInput,
  ): Promise<UserSettings> {
    try {
      // Retrieve the user by user_id
      const user = await this.userRepository.findOne({ id: payload.user_id });

      if (!user) {
        throw new InternalServerErrorException('User not found');
      }
      // Create and save the UserSettings
      const userSetting = await this.userSettingRepository.create(payload);
      // Link the settings to the user and save
      user.settings = userSetting;
      await this.userRepository.create(user);

      return userSetting;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create user settings');
    }
  }
}
