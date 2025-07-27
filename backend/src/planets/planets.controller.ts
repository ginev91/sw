import { Controller, Get, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { ResourceQuery } from 'src/common/interfaces/swapi.interfaces';
import { ResourceQueryDto } from 'src/common/dto/filter-query.dto';

@Controller('swapi/planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  async findAll(@Query() query: ResourceQueryDto) {
    return this.planetsService.findAll(query);
  }
}