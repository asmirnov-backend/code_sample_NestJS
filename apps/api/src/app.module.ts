import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { BroadstreetModule } from './broadstreet/broadstreet.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BroadstreetModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
