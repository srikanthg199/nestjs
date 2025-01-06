import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../permission.entity';
import { seederController } from './role-permission.controller';
import { RolePermissionService } from './role-permission.service';
import { Role } from '../role.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role]), UserModule],
  providers: [RolePermissionService],
  controllers: [seederController],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
