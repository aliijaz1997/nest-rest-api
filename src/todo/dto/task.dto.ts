import { Status } from '../todo.entity';

export class createTodoDto {
  title: string;
  description: string;
}

export class UpdateTodoDto {
  status: Status;
}
