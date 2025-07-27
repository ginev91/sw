import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CacheService } from './cache.service';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    RedisModule.forRoot({
        type: 'single',
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CustomCacheModule {}