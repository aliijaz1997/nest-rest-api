import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
export enum Status {
  DONE = 'DONE',
  NOT_DONE = 'NOT_DONE',
}
export class TODO {
  id: string;

  @IsString()
  @MaxLength(10, { message: 'Please enter less than 10 characters' })
  title: string;

  @IsString()
  @MinLength(5, { message: 'Please enter more than 5 charachter' })
  description: string;

  @IsEnum(Status)
  status: Status;
}
