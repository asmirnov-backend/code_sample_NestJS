import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { BroadstreetModule } from './broadstreet/broadstreet.module';

@Module({
  imports: [BroadstreetModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
