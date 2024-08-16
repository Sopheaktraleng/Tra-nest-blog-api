import { AuthGuard } from '@nestjs/passport';

export class GoogleOuthGuard extends AuthGuard('google') {}
