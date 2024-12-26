import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSettingService } from './userSetting.service';
import { UserSettingRepository } from './userSetting.repository';
import { UserSettings } from 'src/graphql/models/Setting';
import { UserSettingsResolver } from './userSetting.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSettings])],
  providers: [
    UserResolver,
    UserService,
    UserRepository,
    UserSettingService,
    UserSettingRepository,
    UserSettingsResolver,
  ],
})
export class UserModule {}
