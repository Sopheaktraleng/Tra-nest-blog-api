import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserPayload {
  @ApiProperty({
    required: true,
    example: 'SopheaktraLeng',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    required: true,
    example: 'sopheaktraleng@gmial.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'leng',
  })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    required: true,
    example: 'Sopheaktra',
  })
  lastname: string;
  picture: string;
}
