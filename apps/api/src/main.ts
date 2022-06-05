import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const config = appContext.get(ConfigService);
  const httpPort = Number(config.get<string>('APP_PORT')) || 3000;

  const app = await NestFactory.create(AppModule);
  await app.listen(httpPort);
}
bootstrap();
