import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorators/roles.decorator';

const fakeUser = {
  name: 'Test roles guard user',
  roles: ['admin', 'guest'],
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    // TODO: according to user roles we have write logic here
    // const request = context.switchToHttp().getRequest();
    // const user = request.user;
    const hasRole = roles.every((role) => fakeUser.roles.includes(role));
    if (!hasRole) {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }
    return true;
  }
}
