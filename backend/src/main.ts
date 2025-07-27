import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { BadRequestException, ValidationPipe, VersioningType } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => new BadRequestException(errors),
  }));

    app.use(
    rateLimit({
      windowMs: 60 * 1000, 
      max: 5,
      message: 'Too many requests!',
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
