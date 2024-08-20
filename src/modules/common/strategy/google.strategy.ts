import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifiedCallback } from 'passport-google-oauth2';
import { AuthService } from 'src/modules/auth/auth.service';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK'),
      scope: ['email', 'profile', 'openid'],
    });
  }
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ): Promise<any> {
    const { id, name, email, photos } = profile;
    const user = {
      provider: 'google',
      id: id,
      email: email[0].value,
      name: `${name.givenName} ${name.familyName}`,
      firstname: name.givenName,
      lastname: name.familyName,
      picture: photos[0].value,
      _accessToken,
    };
    const validateUser = await this.authService.validateUserOauth(user);
    done(null, validateUser);
  }
}
