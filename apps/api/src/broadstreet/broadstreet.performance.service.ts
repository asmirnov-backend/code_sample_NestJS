import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import { PrismaService } from '@api/prisma/prisma.service';
import { PerformanceParams } from '@common/interfaces/performance.params.interface';
import { calculateDatesForPerformanceByDay } from '@common/utils/calculate-dates';

import {
  BroadstreetPerformance,
  BroadstreetPerformanceByCreatives,
} from './interfaces/broadstreet.performance.interface';

@Injectable()
export class BroadstreetPerformanceService {
  constructor(private readonly prisma: PrismaService) {}

  public async getBroadstreetPerformanceCommon(
    params: PerformanceParams,
  ): Promise<BroadstreetPerformance[]> {
    const performance =
      await this.prisma.broadstreet_performance_campaign.groupBy({
        by: ['date'],
        where: {
          campaign_id: {
            in: params.campaignIds,
          },
          date: calculateDatesForPerformanceByDay(params),
        },
        _sum: {
          views: true,
          hovers: true,
          clicks: true,
        },
      });

    return performance.map((e) => ({
      date: DateTime.fromJSDate(e.date),
      impressions: e._sum.views ?? 0,
      clicks: e._sum.clicks ?? 0,
      hovers: e._sum.hovers ?? 0,
    }));
  }

  public async getBroadstreetPerformanceByCreatives(
    params: PerformanceParams,
  ): Promise<BroadstreetPerformanceByCreatives[]> {
    const performance =
      await this.prisma.broadstreet_performance_creatives.groupBy({
        by: ['creative_id', 'creative_name'],
        where: {
          campaign_id: {
            in: params.campaignIds,
          },
          date: calculateDatesForPerformanceByDay(params),
        },
        _sum: {
          views: true,
          hovers: true,
          clicks: true,
        },
      });

    return performance.map((e) => ({
      creativeId: e.creative_id,
      creativeName: e.creative_name,
      impressions: e._sum.views ?? 0,
      clicks: e._sum.clicks ?? 0,
      hovers: e._sum.hovers ?? 0,
    }));
  }
}
