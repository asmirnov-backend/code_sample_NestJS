import { AdvertiserResolver } from './advertiser.resolver';
import { MetadataService } from './metadata.service';

import { PrismaModule } from '@api/prisma/prisma.module';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  providers: [MetadataService, AdvertiserResolver],
})
export class MetadataModule {}
