import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { SwapiModule } from '../swapi/swapi.module';
import { CustomCacheModule } from '../cache/cache.module';
import { CacheService } from '../cache/cache.service';

@Module({
  imports: [SwapiModule, CustomCacheModule],
  controllers: [PeopleController],
  providers: [PeopleService, CacheService],
})
export class PeopleModule {}