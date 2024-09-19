import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BookPayload {
  @ApiProperty({
    required: true,
    example: 'HOD',
  })
  @IsString()
  tittle: string;
  @ApiProperty({
    required: true,
    example: 'SuperTR44',
  })
  @IsString()
  author: string;
  @ApiProperty({
    required: true,
    example: '14th Sep 2024',
  })
  @IsNotEmpty()
  publishDate: string;
  @ApiProperty({
    required: true,
    example: '123',
  })
  @IsNotEmpty()
  pages: number;
}
