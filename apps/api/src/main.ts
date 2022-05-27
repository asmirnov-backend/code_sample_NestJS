import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { LoggingRequestInterceptor } from './logging-request.interceptor';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const config = appContext.get(ConfigService);
  const httpPort = Number(config.get<string>('APP_PORT')) || 3000;

  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingRequestInterceptor());
  await app.listen(httpPort);
}
bootstrap();
