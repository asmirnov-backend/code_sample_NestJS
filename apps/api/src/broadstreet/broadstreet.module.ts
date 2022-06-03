import { Module } from '@nestjs/common';

import { MetadataService } from '@api/metadata/metadata.service';

import { BroadstreetController } from './broadstreet.controller';
import { BroadstreetPerformanceService } from './broadstreet.performance.service';
import { BroadstreetService } from './broadstreet.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BroadstreetController],
  providers: [
    BroadstreetService,
    BroadstreetPerformanceService,
    MetadataService,
  ],
  exports: [MetadataService],
})
export class BroadstreetModule {}
