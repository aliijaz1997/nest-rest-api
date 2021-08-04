import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createTodoDto, UpdateTodoDto } from './dto/task.dto';
import { Status, TODO } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private todoModel: Model<TODO>) {}
  async findAll(): Promise<TODO[]> {
    return await this.todoModel.find();
  }

  async create(createTodo: createTodoDto): Promise<TODO> {
    const { title, description } = createTodo;
    const task = new TODO();
    task.title = title;
    task.description = description;
    task.status = Status.DONE;
    return await new this.todoModel(task).save();
  }

  async findOne(id: string): Promise<TODO> {
    return await this.todoModel.findOne({ _id: id });
  }

  async Delete(id: string): Promise<TODO> {
    return await this.todoModel.findByIdAndDelete(id);
  }

  async Update(id: string, updateStatus: Status): Promise<TODO> {
    console.log(updateStatus, 'updated status');
    return await this.todoModel.findByIdAndUpdate(id, { status: updateStatus });
  }
}
