import { Module } from '@nestjs/common';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { SwapiModule } from 'src/swapi/swapi.module';
import { CustomCacheModule } from 'src/cache/cache.module';

@Module({
  imports: [
    SwapiModule,
    CustomCacheModule,
  ],
  controllers: [StarshipsController],
  providers: [StarshipsService]
})
export class StarshipsModule {}
