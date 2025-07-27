import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SwapiService } from '../swapi/swapi.service';
import { BaseResourceService } from '../common/services/base-resource.service';
import { vehicleFilterableFields } from 'src/common/utils/filterable-fields';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class VehiclesService extends BaseResourceService {
  constructor(
    swapiService: SwapiService,
    cacheService: CacheService,
    configService: ConfigService,
    logger: PinoLogger,
  ) {
    super(swapiService, cacheService, 'vehicles', vehicleFilterableFields, configService, logger);
  }
}