import { Controller, Get, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { ResourceQuery } from 'src/common/interfaces/swapi.interfaces';
import { ResourceQueryDto } from 'src/common/dto/filter-query.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  async findAll(@Query() query: ResourceQueryDto) {
    return this.vehiclesService.findAll(query);
  }
}