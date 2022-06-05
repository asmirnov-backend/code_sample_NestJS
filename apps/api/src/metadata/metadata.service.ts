import { PrismaService } from '@api/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { Advertiser, Campaign } from '@prisma/client';

@Injectable()
export class MetadataService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAdvertiser(
    advertiserOriginId: string,
  ): Promise<Advertiser | null> {
    return this.prisma.advertiser.findUnique({
      where: { originId: advertiserOriginId },
    });
  }

  public async getCampaigns(params: {
    advertiserId: number;
    campaignOriginIds?: number[];
  }): Promise<Campaign[]> {
    return this.prisma.campaign.findMany({
      where: {
        advertiserId: params.advertiserId,
        originId: { in: params.campaignOriginIds },
      },
    });
  }
}
