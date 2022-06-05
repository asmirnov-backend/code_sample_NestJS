import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@api/prisma/prisma.module';

import { AdvertiserResolver } from './advertiser.resolver';
import { MetadataService } from './metadata.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  providers: [MetadataService, AdvertiserResolver],
})
export class MetadataModule {}
