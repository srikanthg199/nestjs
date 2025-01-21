import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequiredPermission } from 'src/decorators/required-permission.decorator';
import { sendResponse } from 'src/utils/response.util';
import { Response } from 'express';

@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @RequiredPermission('CREATE_TASK')
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const task = await this.taskService.create(createTaskDto, user);
    return sendResponse(res, task, 'Task created successfully');
  }

  @Get()
  // @UseGuards(PermissionsGuard)
  @RequiredPermission('FETCH_TASKS')
  async findAll(@Res() res: Response) {
    const tasks = await this.taskService.findAll();
    return sendResponse(res, tasks, 'Tasks fetched successfully');
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermission('VIEW_TASK')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const task = await this.taskService.findOne(id);
    return sendResponse(res, task, 'Task fetched successfully');
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermission('UPDATE_TASK')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response,
  ) {
    const data = await this.taskService.update(+id, updateTaskDto);
    return sendResponse(res, data, 'Task updated successfully');
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermission('DELETE_TASK')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.taskService.remove(+id);
    return sendResponse(res, {}, 'Task deleted successfully');
  }
}
