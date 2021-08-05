import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from './Interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  async findAll(): Promise<User[]> {
    return this.authService.findAll();
  }
  @Post('/signup')
  async SignUp(@Body() createUser: User): Promise<User> {
    return this.authService.createUser(createUser);
  }
  @Post('/signin')
  async SignIn(@Body() createUser: User): Promise<{ accessToken: string }> {
    return this.authService.loginUser(createUser);
  }

  @Delete(':id')
  DeleteTodo(@Param('id') id: string) {
    return this.authService.Delete(id);
  }
}
