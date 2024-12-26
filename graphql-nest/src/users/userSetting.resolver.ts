import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSettings } from 'src/graphql/models/Setting';
import { CreateUserSettingsInput } from 'src/graphql/utils/userSetting';
import { UserSettingService } from './userSetting.service';

@Resolver()
export class UserSettingsResolver {
  constructor(private readonly userSettingsService: UserSettingService) {}
  @Mutation(() => UserSettings)
  createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    return this.userSettingsService.createUserSettings(createUserSettingsData);
  }
}
