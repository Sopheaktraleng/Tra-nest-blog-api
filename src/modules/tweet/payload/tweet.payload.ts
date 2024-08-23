import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TweetPayload {
  @ApiProperty({
    required: true,
    example: 'tweet1',
  })
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    required: true,
    example: 'qfagah',
  })
  @IsNotEmpty()
  imageId: string;
}
