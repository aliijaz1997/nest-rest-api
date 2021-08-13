import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { query } from 'express';
import { getUser } from 'src/auth/getuser-decorator';
import { createTodoDto } from './dto/task.dto';
import { Status, TODO } from './todo.entity';
import { TodoService } from './todo.service';
import { Logger } from '@nestjs/common';
import { resolveSoa } from 'dns';

@Controller('todo')
export class TodoController {
  private logger = new Logger('Todo Controller');
  constructor(private todoService: TodoService) {}
  @Get('all')
  @UseGuards(AuthGuard())
  GetTodos(@getUser() userId: string): Promise<TODO[]> {
    this.logger.verbose(
      `The user with userId = ${userId} is retrieving all tasks`,
    );
    return this.todoService.findAll(userId);
  }
  @Post('create')
  @UseGuards(AuthGuard())
  CreateTodo(
    @Body() item: createTodoDto,
    @getUser() userId: string,
  ): Promise<TODO> {
    this.logger.verbose(`
    User with id = ${userId} is retrieving task = ${JSON.stringify(item)}
    `);
    return this.todoService.create(item, userId);
  }

  @Get(':id')
  GetTodoById(@Param('id') id: string): Promise<TODO> {
    const item = this.todoService.findOne(id);
    return item;
  }
  @Delete(':id')
  @UseGuards(AuthGuard())
  DeleteTodo(@Param('id') id: string, @getUser() userId: string) {
    return this.todoService.Delete(id, userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  UpdateTodo(
    @Body() updateTodo: { status: Status },
    @Param('id') id: string,
    @getUser() userId: string,
  ): Promise<TODO> {
    const { status } = updateTodo;
    return this.todoService.Update(id, status, userId);
  }
}
