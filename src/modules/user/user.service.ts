import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    create(): string{
        return 'User is created!!!'
    }
}
