import { Controller, Get, Query } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { ResourceQuery } from 'src/common/interfaces/swapi.interfaces';
import { ResourceQueryDto } from 'src/common/dto/filter-query.dto';

@Controller('swapi/starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Get()
  async findAll(@Query() query: ResourceQueryDto) {
    return this.starshipsService.findAll(query);
  }
}