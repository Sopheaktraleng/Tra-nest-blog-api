import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class UserPayload {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @MinLength(5)
  password: string;
  @IsNotEmpty()
  dateOfBirth: string;
}
