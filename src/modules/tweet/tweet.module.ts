import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetEntity } from './entity/tweet.entity';
import { TweetController } from './tweet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TweetEntity])],
  controllers: [TweetController],
  providers: [TweetService],
  exports: [TweetService],
})
export class TweetModule {}
