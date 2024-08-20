import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterPayload {
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
  @ApiProperty({
    required: true,
    example: 'Leng',
  })
  lastname: string;
  @ApiProperty({ nullable: true })
  picture: string;

  @ApiProperty({
    required: true,
    example: '1234567',
  })
  @ApiProperty({ nullable: true })
  password: string;
}
