import { Injectable, Param } from '@nestjs/common';
import { TweetPayload } from './payload/tweet.payload';
import { TweetEntity } from './entity/tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(TweetEntity)
    private readonly tweetRepository: Repository<TweetEntity>,
  ) {}
  async create(tweetpayload: TweetPayload): Promise<TweetEntity> {
    const tweet = this.tweetRepository.create(tweetpayload);
    return await this.tweetRepository.save(tweet);
  }
  async getAll(): Promise<TweetEntity[]> {
    return await this.tweetRepository.find();
  }
  async getById(@Param('id') id: string) {
    const tweet = await this.tweetRepository.findOne({ where: { id } });
    return tweet;
  }
}
