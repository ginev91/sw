import { Module } from '@nestjs/common';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { SwapiModule } from '../swapi/swapi.module';
import { CustomCacheModule } from '../cache/cache.module';

@Module({
  imports: [
    SwapiModule,   
    CustomCacheModule,  
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule {}