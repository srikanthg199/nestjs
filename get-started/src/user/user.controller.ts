import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, GetUserDto, UpdateUserDto } from './dto/user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Response } from 'express';
import { sendResponse } from 'src/utils/response.util';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@UseInterceptors(new SerializeInterceptor(GetUserDto))
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return { status: true, message: 'User created successfully', data: user };
  }

  @Get()
  @Roles(['admin'])
  // @UseGuards(AuthGuard, RolesGuard)
  // @UseGuards(JwtAuthGuard)
  async findAll(@Res() res: Response) {
    const users = await this.userService.getUsers();
    return sendResponse(res, users, 'Users fetched successfully');
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.getUserById(id);
    return { status: true, message: 'User fetched successfully', data: user };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    await this.userService.deleteUser(id);
    return sendResponse(res, null, 'User deleted successfully');
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    return sendResponse(res, updatedUser, 'User updated successfully');
  }
  // Get user by email via body
}
