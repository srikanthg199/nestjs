import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Permission } from '../permission.entity';
import { Role } from '../role.entity';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  async seed() {
    const permissions = [
      { key: 'CREATE_USER', value: 'Create User' },
      { key: 'UPDATE_USER', value: 'Update User' },
      { key: 'DELETE_USER', value: 'Delete User' },
      { key: 'VIEW_USER', value: 'View User' },
      { key: 'FETCH_USERS', value: 'Fetch Users' },
      { key: 'CREATE_TASK', value: 'Create Task' },
      { key: 'UPDATE_TASK', value: 'Update Task' },
      { key: 'DELETE_TASK', value: 'Delete Task' },
      { key: 'VIEW_TASK', value: 'View Task' },
      { key: 'FETCH_TASKS', value: 'Fetch Tasks' },
    ];

    for (const permission of permissions) {
      const existingPermission = await this.permissionRepository.findOne({
        where: { key: permission.key },
      });
      if (!existingPermission) {
        await this.permissionRepository.save(permission);
      }
    }
    return 'Permission seeding completed';
  }

  fetchPermissions() {
    return this.permissionRepository.find();
  }

  fetchRoles() {
    return this.roleRepository.find();
  }

  getRoleWithPermissions(id: string) {
    return this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  async createRole(createRoleDto) {
    const { name } = createRoleDto;
    const role = { name };
    const isExist = await this.roleRepository.findOne({
      where: { name },
    });
    if (isExist) {
      throw new ConflictException('Role already exists');
    }
    // Save the updated or new role with the new permissions
    return await this.roleRepository.save(role);
  }

  async updateRole(
    roleId: string,
    createRoleDto: { name: string; permissionIds: string[] },
  ) {
    const { name, permissionIds } = createRoleDto;

    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    if (!role) {
      throw new Error('Role not found');
    }

    if (permissionIds && permissionIds.length > 0) {
      const permissions = await this.permissionRepository.find({
        where: { id: In(permissionIds) },
      });

      if (permissions.length !== permissionIds.length) {
        throw new Error('Some permissions were not found');
      }
      role.permissions = permissions;
    }
    if (name) {
      role.name = name;
    }
    await this.roleRepository.save(role);

    return role;
  }

  async createUserRoles(createUserRoleDto: {
    userId: string;
    roleIds: string[];
  }) {
    const { userId, roleIds } = createUserRoleDto;
    // Fetch the user by ID
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const roles = await this.roleRepository.find({
      where: { id: In(roleIds) },
    });
    if (!roles.length) {
      throw new NotFoundException('Roles not found');
    }
    user.roles = roles;
    return await this.userRepository.saveData(user);
  }

  async deleteRole(roleId: string): Promise<void> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['users'],
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }
    console.log(/r/, role);

    //clear user role relationships
    // Clear the user-role relationships in the join table
    await this.roleRepository
      .createQueryBuilder()
      .relation(Role, 'users')
      .of(roleId)
      .remove(role.users);

    // Delete the role
    await this.roleRepository.remove(role);
    return;
  }
}
