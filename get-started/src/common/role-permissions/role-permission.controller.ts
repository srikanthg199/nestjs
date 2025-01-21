import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
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

  @Post('roles')
  async createRole(
    @Body() createRoleDto: { name: string },
    @Res() res: Response,
  ) {
    await this.rolePermissionService.createRole(createRoleDto);
    return sendResponse(res, {}, 'Role completed successfully');
  }

  @Patch('roles/:roleId')
  async updateRole(
    @Param('roleId') roleId: string,
    @Body() createRoleDto: { name: string; permissionIds: string[] },
    @Res() res: Response,
  ) {
    const role = await this.rolePermissionService.updateRole(
      roleId,
      createRoleDto,
    );
    return sendResponse(res, role, 'Role updated successfully');
  }

  @Get('roles/:id')
  async getRole(@Param('id') id: string, @Res() res: Response) {
    const Roles = await this.rolePermissionService.getRoleWithPermissions(id);
    return sendResponse(res, Roles, 'Roles fetched successfully');
  }

  @Delete('/roles/:roleId')
  async deleteRole(@Param('roleId') roleId: string, @Res() res: Response) {
    await this.rolePermissionService.deleteRole(roleId);
    return sendResponse(res, {}, 'Role deleted successfully');
  }

  @Post('user-role')
  async createUserRole(
    @Body() createUserRoleDto: { userId: string; roleIds: string[] },
    @Res() res: Response,
  ) {
    await this.rolePermissionService.createUserRoles(createUserRoleDto);
    return sendResponse(res, {}, 'User role created successfully');
  }
}
