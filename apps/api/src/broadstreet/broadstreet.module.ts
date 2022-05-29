import { Module } from '@nestjs/common';

import { BroadstreetController } from './broadstreet.controller';
import { BroadstreetPerformanceService } from './broadstreet.performance.service';
import { BroadstreetService } from './broadstreet.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    BroadstreetService,
    BroadstreetPerformanceService,
    BroadstreetController,
  ],
})
export class BroadstreetModule {}
