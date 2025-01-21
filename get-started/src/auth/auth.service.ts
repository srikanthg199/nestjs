import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from 'src/utils/auth.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = await this.userService.getUserByEmail(email, [
      'roles',
      'roles.permissions',
    ]);
    if (!findUser || !(await validatePassword(password, findUser.password))) {
      return null;
    }
    // Extract permissions from roles
    const permissions = findUser.roles.flatMap((role) =>
      role.permissions.map((permission) => permission.key),
    );
    // delete findUser.roles;

    const { password: _password, ...user } = findUser;
    const token = await this.jwtService.signAsync(user, {
      expiresIn: '1d',
    } as any);
    return { user, permissions, token };
  }
}
