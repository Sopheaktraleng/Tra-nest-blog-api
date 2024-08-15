import { Body, Controller, Post, Req, Get } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  @ApiBearerAuth()
  @Get('me')
  async getLoggedUser(@Req() request): Promise<any> {
    return await this.userService.getbyUsername(request.username);
  }
}
