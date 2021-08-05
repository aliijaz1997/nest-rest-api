import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/auth/getuser-decorator';
import { User } from 'src/auth/Interface/auth.interface';
import { createTodoDto } from './dto/task.dto';
import { Status, TODO } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  // @UseInterceptors(ClassSerializerInterceptor)
  @Get('all')
  GetTodos(): Promise<TODO[]> {
    return this.todoService.findAll();
  }
  // @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  @UseGuards(AuthGuard())
  CreateTodo(
    @Body() item: createTodoDto,
    @getUser() userId: string,
  ): Promise<TODO> {
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
