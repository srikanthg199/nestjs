import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    UserService,
    UserRepository,
  ],
})
export class UserModule {}
