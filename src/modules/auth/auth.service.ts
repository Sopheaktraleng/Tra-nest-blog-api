import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEnity } from '../user/entity/user.entity';
import { LoginPayload } from './payload/login.payload';
import * as bcrypt from 'bcryptjs';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
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
  // async registerGoogleUser(code: any): Promise<any> {
  //   const { data } = await this.httpService.axiosRef.post(
  //     'http://oauth2.googleapis.com/token',
  //     {
  //       client_id: this.configService.get('GOOGLE_CLIENT_ID'),
  //       client_secret: this.configService.get('GOOGLE_CLIENT_SECRET'),
  //       code: code,
  //       redirect_uri: this.configService.get('GOOGLE_CALLBACK'),
  //       grant_type: 'authorization_code',
  //     },
  //   );
  //   const accessToken = data.accessToken;
  //   const reponse = await this.httpService.axiosRef.get(
  //     'http://www.googleapis.com/oauth2/v2/userinfo',
  //     {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     },
  //   );
  //   const user = await this.userRepository.findOne({
  //     where: { email: reponse.data.email },
  //   });
  //   if (user) {
  //     return this.createToken(user);
  //   }
  //   const newUser = this.userRepository.create({
  //     name: reponse.data.name,
  //     email: reponse.data.email,
  //     username: reponse.data.firstname + new Date().getTime(),
  //   });
  //   this.userRepository.save(newUser);
  //   console.log(newUser);
  //   return this.createToken(newUser);
  // }
  async validateUserOauth(userDetails: any): Promise<any> {
    const user = await this.userService.getbyEmail(userDetails.email);
    if (user) {
      return this.createToken(user);
    } else {
      const newUser = this.userService.create({
        email: userDetails.email,
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
        password: 'null',
        username: userDetails.firstname,
        picture: 'null',
      });
      return newUser;
    }
  }
}
