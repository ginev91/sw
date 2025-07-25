import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from './cache/cache.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PeopleModule } from './people/people.module';
import { PlanetsModule } from './planets/planets.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { StarshipsModule } from './starships/starships.module';

@Module({
  imports: [TasksModule, DatabaseModule, CacheModule, UserModule, AuthModule, PeopleModule, PlanetsModule, VehiclesModule, StarshipsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
