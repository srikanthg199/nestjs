import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(/INSIDE AUTh GUARD/);
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    // Check if there is an authorization header
    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized request');
    }

    // Dummy authentication
    const token = authHeader.split(' ')[1];
    if (token !== 'my-secret-token') {
      throw new UnauthorizedException('Invalid token');
    }

    // TODO: Implement your authentication logic here
    // For example, you can check the token against a database or use a JWT library

    return true;
  }
}
