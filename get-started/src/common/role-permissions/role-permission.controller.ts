import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { sendResponse } from 'src/utils/response.util';
import { Response } from 'express';
import { RolePermissionService } from './role-permission.service';

@Controller()
export class seederController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Post('permissions/seed')
  async seedPermissions(@Res() res: Response) {
    await this.rolePermissionService.seed();
    return sendResponse(res, {}, 'permission completed successfully');
  }

  @Get('permissions')
  async getPermissions(@Res() res: Response) {
    const permissions = await this.rolePermissionService.fetchPermissions();
    return sendResponse(res, permissions, 'permissions fetched successfully');
  }

  @Get('roles')
  async getRoles(@Res() res: Response) {
    const Roles = await this.rolePermissionService.fetchRoles();
    return sendResponse(res, Roles, 'Roles fetched successfully');
  }

  @Post('role')
  async createRole(
    @Body() createRoleDto: { name: string; permissionIds: string[] },
    @Res() res: Response,
  ) {
    await this.rolePermissionService.createRole(createRoleDto);
    return sendResponse(res, {}, 'permission completed successfully');
  }
  @Post('user-role')
  async createUserRole(
    @Body() createUserRoleDto: { userId: string; roleIds: string[] },
    @Res() res: Response,
  ) {
    await this.rolePermissionService.createUserRoles(createUserRoleDto);
    return sendResponse(res, {}, 'permission completed successfully');
  }
}
