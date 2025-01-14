import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  // providers: [UserService, UserRepository],
  providers: [
    {
      provide: UserService,
      useClass: UserService,
    },
    UserRepository,
  ],

  exports: [UserService, UserRepository],
})
export class UserModule {}
