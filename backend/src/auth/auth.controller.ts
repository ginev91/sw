import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly users: UserService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() body: RegisterDto) {
    const user = await this.users.create(body.email, body.password);
    return { id: user.id, email: user.email };
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.auth.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException();
    return this.auth.login(user);
  }
}