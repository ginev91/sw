import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SwapiService {
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('SWAPI_BASE_URL');
  }

  async fetchResource(resource: string) {
    const url = `${this.baseUrl}/${resource}/`;
    const response = await axios.get(url);
    return response.data;
  }

  async fetchByUrl(url: string) {
    const response = await axios.get(url);
    return response.data;
  }
}