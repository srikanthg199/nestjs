import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = await this.userService.getUserByEmail(email);
    if (!findUser || findUser.password !== password) {
      return null;
    }
    const { password: _password, ...user } = findUser;
    return this.jwtService.signAsync(user);
  }
}
