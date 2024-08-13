import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class UserPayload {
  @ApiProperty({
    required: true,
    example: 'sopheaktraleng@gmial.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    example: 'sopheaktraleng',
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    example: '1234567',
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;
  @ApiProperty({
    example: 'agjlagslga',
  })
  @IsNotEmpty()
  dateOfBirth: string;
}
