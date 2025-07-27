import { Controller, Get, Query, Version } from '@nestjs/common';
import { PeopleService } from './people.service';
import { ResourceQuery } from 'src/common/interfaces/swapi.interfaces';
import { ResourceQueryDto } from 'src/common/dto/filter-query.dto';

@Controller('swapi/people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  @Version('1')
  async findAll(@Query() query: ResourceQueryDto) {
    return this.peopleService.findAll(query);
  }

  @Get()
  @Version('2')
  findAllV2() {
    return "This is v2 of the endpoint, just testing versioning";
  }
}