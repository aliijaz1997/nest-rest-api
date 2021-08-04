import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class User {
  id?: string;

  @IsNotEmpty()
  @IsLowercase()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
