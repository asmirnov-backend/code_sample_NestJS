import { Injectable } from '@nestjs/common';

import { PrismaService } from '@api/prisma/prisma.service';

@Injectable()
export class MetadataService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAdvertiser(advertiserOriginId: string) {
    return this.prisma.advertiser.findUnique({
      where: { originId: advertiserOriginId },
    });
  }

  public async getCampaigns(params: {
    advertiserId: bigint;
    campaignOriginIds: number[];
  }) {
    return this.prisma.campaign.findMany({
      where: {
        advertiserId: params.advertiserId,
        originId: { in: params.campaignOriginIds },
      },
    });
  }
}
