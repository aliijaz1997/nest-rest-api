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
import { createTodoDto } from './dto/task.dto';
import { Status, TODO } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get('all')
  GetTodos(): Promise<TODO[]> {
    return this.todoService.findAll();
  }

  @Post('create')
  @UseGuards(AuthGuard())
  CreateTodo(@Body() item: createTodoDto): Promise<TODO> {
    return this.todoService.create(item);
  }

  @Get(':id')
  GetTodoById(@Param('id') id: string): Promise<TODO> {
    const item = this.todoService.findOne(id);
    return item;
  }
  @Delete(':id')
  @UseGuards(AuthGuard())
  DeleteTodo(@Param('id') id: string) {
    return this.todoService.Delete(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  UpdateTodo(
    @Body() updateTodo: { status: Status },
    @Param('id') id: string,
  ): Promise<TODO> {
    const { status } = updateTodo;
    return this.todoService.Update(id, status);
  }
}
