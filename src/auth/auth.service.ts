import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './Interface/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }
  async createUser(creditendialsAuth: User): Promise<User> {
    const { username, password, email } = creditendialsAuth;
    return await this.userModel.create({ username, password, email });
  }
  async loginUser(creditendialsAuth: User): Promise<{ accessToken: string }> {
    const { username, password } = creditendialsAuth;
    const alreadyUser = await this.userModel.findOne({ username });
    if (alreadyUser && password === alreadyUser.password) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Invalid username or password');
  }

  async Delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
