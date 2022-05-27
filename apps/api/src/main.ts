import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { LoggingRequestInterceptor } from './logging-request.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingRequestInterceptor());
  await app.listen(3000);
}
bootstrap();
