import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<Permissions[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions) {
      return true; // No permissions required for the route
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(/uuu/, user);

    if (!user || !user.roles) {
      throw new ForbiddenException('Permissions not found');
    }

    const userPermissions = user.roles.flatMap((role) =>
      role.permissions.map((permission) => permission.key),
    );

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }
    return true;
  }
}
