import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

public createTypeOrmOptions(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: this.configService.get<string>('DATABASE_HOST'),
    port: this.configService.get<number>('DATABASE_PORT'),
    username: this.configService.get<string>('DATABASE_USERNAME'),
    password: this.configService.get<string>('DATABASE_PASSWORD'),
    database: this.configService.get<string>('DATABASE_NAME'),
    migrationsRun: true,
    name: 'swapi',
    migrations: ['dist/migrations/runs/*.js'],
    entities: ['dist/**/*.entity.js'],
    logging: ['error', 'warn', 'info'],
    synchronize: false,
  };
}
}
