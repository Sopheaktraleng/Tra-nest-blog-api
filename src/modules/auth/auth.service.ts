import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEnity } from '../user/entity/user.entity';
import { LoginPayload } from './payload/login.payload';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    @InjectRepository(UserEnity)
    private readonly userRepository: Repository<UserEnity>,
  ) {}
  createToken(user: UserEnity) {
    return {
      expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({ id: user.id }),
      user,
    };
  }
  async validateUser(payload: LoginPayload): Promise<UserEnity> {
    const user = await this.userService.getbyUsername(payload.username);
    if (!user || !bcrypt.compare(payload.password, user.password)) {
      throw new UnauthorizedException('Username or Password is not correct!');
    }
    return user;
  }
}
