import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createTodoDto } from './dto/task.dto';
import { Status, TODO } from './todo.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class TodoService {
  private logger = new Logger('TodoService');
  constructor(@InjectModel('Todo') private todoModel: Model<TODO>) {}
  async findAll(userId: string): Promise<TODO[]> {
    console.log(userId);

    if (!userId) {
      this.logger.error(`Failed to fetch the todos of user : ${userId}`);
      throw new NotFoundException('Please sign in first');
    }
    return await this.todoModel.find({ userId });
  }

  async create(createTodo: createTodoDto, userId: string): Promise<TODO> {
    const { title, description } = createTodo;
    const task = new TODO();
    task.userId = userId;
    task.title = title;
    task.description = description;
    task.status = Status.NOT_DONE;

    return await new this.todoModel(task).save();
  }

  async findOne(id: string): Promise<TODO> {
    return await this.todoModel.findOne({ _id: id });
  }

  async Delete(id: string, userId: string): Promise<TODO> {
    const item = await this.todoModel.findById(id);
    if (item.userId === userId) {
      return await this.todoModel.findByIdAndDelete(id);
    }

    throw new ForbiddenException('You are not authorized to delete');
  }

  async Update(
    id: string,
    updateStatus: Status,
    userId: string,
  ): Promise<TODO> {
    console.log(updateStatus, 'updated status');
    const item = await this.todoModel.findById(id);
    if (item.userId === userId) {
      return await this.todoModel.findByIdAndUpdate(id, {
        status: updateStatus,
      });
    }
    throw new ForbiddenException('You are not authorized to make any changes');
  }
}
