import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createRole(createRoleDto) {
    // Fetch the permissions by the provided IDs
    const permissions = await this.permissionRepository.find({
      where: { id: In(createRoleDto.permissionIds) },
    });

    let role = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
      relations: ['permissions'],
    });

    if (role) {
      // Override existing permissions with the new set
      role.permissions = permissions;
    } else {
      // Create a new role if it doesn't exist
      role = this.roleRepository.create({
        name: createRoleDto.name,
        permissions,
      });
    }

    // Save the updated or new role with the new permissions
    return await this.roleRepository.save(role);
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
}
