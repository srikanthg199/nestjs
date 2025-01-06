import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequiredPermission } from 'src/decorators/required-permission.decorator';

@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @RequiredPermission('CREATE_TASK')
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.taskService.create(createTaskDto, user);
  }

  @Get()
  // @UseGuards(PermissionsGuard)
  @RequiredPermission('FETCH_TASKS')
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermission('VIEW_TASK')
  async findOne(@Param('id') id: string) {
    const data = await this.taskService.findOne(id);
    console.log(/dd/, data);
    return data;
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermission('UPDATE_TASK')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermission('DELETE_TASK')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
