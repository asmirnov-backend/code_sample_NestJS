import { Injectable } from '@nestjs/common';
import { Advertiser, Campaign } from '@prisma/client';
import { isNull } from 'lodash';

import { PrismaService } from '@api/prisma/prisma.service';

import { AdvertiserNotFoundException } from './exceptions/advertiser-not-found.exception';

@Injectable()
export class MetadataService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAdvertiser(advertiserOriginId: string): Promise<Advertiser> {
    const advertiser = await this.prisma.advertiser.findUnique({
      where: { originId: advertiserOriginId },
    });

    if (isNull(advertiser)) {
      throw new AdvertiserNotFoundException(advertiserOriginId);
    }

    return advertiser;
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
