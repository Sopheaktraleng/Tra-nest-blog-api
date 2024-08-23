import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TweetPayload } from './payload/tweet.payload';
import { TweetService } from './tweet.service';
import { TweetEntity } from './entity/tweet.entity';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('Tweets')
@ApiTags('Tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post('create')
  async createTweet(@Body() tweetpayload: TweetPayload): Promise<TweetEntity> {
    return this.tweetService.create(tweetpayload);
  }

  @Get()
  async getAllTweet(): Promise<TweetEntity[]> {
    return this.tweetService.getAll();
  }

  @Get(':id')
  getTweetById(@Param('id') id: string) {
    return this.tweetService.getById(id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './upload' }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
