import { Body, Controller, Post, Req, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginPayload } from './payload/login.payload';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { GoogleOuthGuard } from '../common/guard/google-oauth.guard';

@Controller('auths')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
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
  @Get('login-google')
  @UseGuards(GoogleOuthGuard)
  async loginGoogle(@Req() req) {
    return req;
  }
  @UseGuards(GoogleOuthGuard)
  @Get('google/callback')
  async goolgeCallback(@Req() req) {
    return req.user;
  }
}
