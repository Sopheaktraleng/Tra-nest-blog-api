import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginPayload } from './payload/login.payload';
import { AuthService } from './auth.service';

@Controller('auths')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Post('/login')
  async login(@Body() payload: LoginPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);
    return this.authService.createToken(user);
  }
}
