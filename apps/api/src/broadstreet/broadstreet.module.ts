import { Module } from '@nestjs/common';

import { BroadstreetPerformanceService } from './broadstreet.performance.service';
import { BroadstreetService } from './broadstreet.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BroadstreetService, BroadstreetPerformanceService],
})
export class BroadstreetModule {}
