import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './type-orm-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * @link https://docs.nestjs.com/techniques/database#custom-datasource-factory
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
