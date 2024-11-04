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
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { Response } from 'express';
import { sendResponse } from 'src/utils/response.util';

@Controller('user')
// @UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const user = this.userService.createUser(createUserDto);
    return sendResponse(res, user, 'User created successfully');
  }

  @Get()
  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(LoggingInterceptor)
  async findAll(@Res() res: Response) {
    const users = await this.userService.getUsers();
    return sendResponse(res, users, 'Users fetched successfully');
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const user = await this.userService.getUserById(id);
    return sendResponse(res, user, 'User fetched successfully');
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
}
