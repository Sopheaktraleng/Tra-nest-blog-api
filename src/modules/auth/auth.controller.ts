import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginPayload } from './payload/login.payload';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
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
  loginGoogle(@Res() response: Response): any {
    const client_id = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const client_callback = this.configService.get<string>('GOOGLE_CALLBACK');
    const uri = `http://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${client_callback}&response_type=code&scope=email profile openid`;
    response.redirect(uri);
  }
  @UseGuards(GoogleOuthGuard)
  @Get('google/callback')
  async goolgeCallback(@Req() request): Promise<any> {
    return request.user;
  }
}
