import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CustomCacheModule } from './cache/cache.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PeopleModule } from './people/people.module';
import { PlanetsModule } from './planets/planets.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { StarshipsModule } from './starships/starships.module';
import { SwapiModule } from './swapi/swapi.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LoggerModule } from 'nestjs-pino';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      },
    }),
    DatabaseModule, CustomCacheModule, UserModule, 
    AuthModule, PeopleModule, PlanetsModule, 
    VehiclesModule, StarshipsModule, SwapiModule, ConfigModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})

export class AppModule {}
