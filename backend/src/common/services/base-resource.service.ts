import { SwapiService } from '../../swapi/swapi.service';
import { SwapiPaginatedResponse } from '../interfaces/swapi.interfaces';
import { SortOrder } from '../enums/swapi.enums';
import { ConfigService } from '@nestjs/config';
import { ResourceQueryDto } from '../dto/filter-query.dto';
import { PinoLogger } from 'nestjs-pino';
import { Injectable } from '@nestjs/common';
import { CacheService } from '../../cache/cache.service';

@Injectable()
export class BaseResourceService<T extends Record<string, any> = any> {
  constructor(
    protected readonly swapiService: SwapiService,
    protected readonly cacheService: CacheService,
    protected readonly resourceName: string,
    protected readonly filterableFields: (keyof T)[],
    protected readonly configService: ConfigService,
    protected readonly logger: PinoLogger,
  ) {}

  async findAll(query: ResourceQueryDto): Promise<SwapiPaginatedResponse<T>> {
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
    const cacheKey = this.buildCacheKey({ ...query, page, limit });

    const cachedStr = await this.cacheService.get(cacheKey);
    if (cachedStr) {
      this.logger.debug({ cacheKey }, `Cache hit for key: ${cacheKey}`);
      return JSON.parse(cachedStr);
    } else {
      this.logger.debug({ cacheKey }, `Cache miss for key: ${cacheKey}`);
    }

    let data: any;
    try {
      data = await this.swapiService.fetchResource(this.resourceName);
      this.logger.debug(`Fetched data for resource: ${this.resourceName}`);
    } catch (err) {
      this.logger.error({ err }, `Failed to fetch resource: ${this.resourceName}`);
      throw err;
    }

    let items: T[] = Array.isArray(data) ? data : (data && data.results ? data.results : []);

    for (const field of this.filterableFields) {
      if (query[String(field)]) {
        items = items.filter((item: T) => {
          if (field === 'name') {
            return (item.name ?? '').toLowerCase().includes((query[String(field)] as string).toLowerCase());
          }
          return (item[field] as string ?? '').toLowerCase() === (query[String(field)] as string).toLowerCase();
        });
        this.logger.debug(`Filtered items by field "${String(field)}": ${items.length} items remain.`);
      }
    }

    if (query.sort) {
      const key = query.sort as keyof T;
      const order = query.order === SortOrder.DESC ? -1 : 1;
      items.sort((a: T, b: T) => {
        let aValue = a[key] ?? '';
        let bValue = b[key] ?? '';
        const aNum = typeof aValue === 'string' ? String(aValue).replace(/,/g, '').trim() : aValue;
        const bNum = typeof bValue === 'string' ? String(bValue).replace(/,/g, '').trim() : bValue;
        const aIsNum = aNum !== '' && !isNaN(Number(aNum));
        const bIsNum = bNum !== '' && !isNaN(Number(bNum));
        if (aIsNum && bIsNum) {
          return (Number(aNum) - Number(bNum)) * order;
        }
        if (aIsNum) return -1 * order;
        if (bIsNum) return 1 * order;
        return String(aValue).localeCompare(String(bValue), undefined, { sensitivity: 'base' }) * order;
      });
      this.logger.debug(`Sorted items by "${String(key)}" in ${order === 1 ? 'ASC' : 'DESC'} order.`);
    }

    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const results = items.slice(start, start + limit);

    const paginatedResponse: SwapiPaginatedResponse<T> = {
      results,
      page,
      limit,
      total,
      totalPages,
    };

    const ttl = this.configService.get<number>('CACHE_TTL', 420);
    try {
      await this.cacheService.set(cacheKey, JSON.stringify(paginatedResponse), ttl );
    } catch (err) {
      this.logger.error({ err }, `Failed to cache response for key: ${cacheKey}`);
    }

    return paginatedResponse;
  }

  protected buildCacheKey(query: ResourceQueryDto): string {
    const keys = Object.keys(query).sort();
    if (keys.length === 0) return this.resourceName;
    const queryString = keys.map(
      k => `${k}=${encodeURIComponent(query[k])}`
    ).join('&');
    return `${this.resourceName}:${queryString}`;
  }
}