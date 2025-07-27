import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { SwapiModule } from 'src/swapi/swapi.module';
import { CustomCacheModule } from 'src/cache/cache.module';

@Module({
  imports: [
    SwapiModule,
    CustomCacheModule,
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService]
})
export class VehiclesModule {}
