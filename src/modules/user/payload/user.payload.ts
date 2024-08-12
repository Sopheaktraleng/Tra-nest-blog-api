import { IsNotEmpty, IsString } from 'class-validator';

export class UserPayload {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  dateOfBirth: string;
}
