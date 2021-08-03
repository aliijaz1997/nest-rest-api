import { IsNotEmpty, IsNumber } from 'class-validator';
export class Item {
  id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
