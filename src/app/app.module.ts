import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TweetModule } from 'src/modules/tweet/tweet.module';
import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from 'src/modules/book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<string>('DB_TYPE'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<string>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          synchronize: configService.get<string>('DB_SYNC'),
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
      }),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          store: redisStore,
          ttl: configService.get<number>('CACHE_TTL'),
          max: configService.get<number>('CACHE_MAX'),
          host: configService.get<string>('CACHE_HOST'),
          port: configService.get<number>('CACHE_PORT'),
        } as CacheModuleAsyncOptions;
      },
    }),
    UserModule,
    AuthModule,
    TweetModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
