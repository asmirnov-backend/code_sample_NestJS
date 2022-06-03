import { ConfigModule } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import { AnalyticsType } from '@prisma/client';

import { BroadstreetPerformanceService } from '@api/broadstreet/broadstreet.performance.service';
import { BroadstreetService } from '@api/broadstreet/broadstreet.service';
import {
  Broadstreet,
  BroadstreetTotal,
  BroadstreetByDayOfWeek,
  BroadstreetByDate,
  BroadstreetByCreative,
} from '@api/broadstreet/interfaces/broadstreet.output.interface';
import { PrismaModule } from '@api/prisma/prisma.module';
import { PrismaService } from '@api/prisma/prisma.service';
import { CampaignsWithInterval } from '@common/interfaces/campaign-with-interval.interface';

describe('BroadstreetService', () => {
  let service: BroadstreetService;
  let prisma: PrismaService;
  let app: TestingModule;
  let params: CampaignsWithInterval;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
      providers: [BroadstreetPerformanceService, BroadstreetService],
    }).compile();

    service = app.get<BroadstreetService>(BroadstreetService);
    prisma = app.get<PrismaService>(PrismaService);

    const campaign = await prisma.campaign.findUnique({
      where: { originId: 1 },
    });
    params = { campaigns: [campaign!] };
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getBroadstreet all', async () => {
    const result: Broadstreet = await service.getBroadstreet(params);

    expect(result.TabName).toBe(AnalyticsType.BROADSTREET);
    expect(result.ByDateImpression).toHaveLength(2);
    expect(result.CreativeList).toHaveLength(2);
    expect(result.DayOfWeekImpression).toHaveLength(2);
  });

  it('getBroadstreetTotal', async () => {
    const result: BroadstreetTotal = await service.getBroadstreetTotal(params);

    expect(result).toEqual({
      AnalyticsType: AnalyticsType.BROADSTREET,
      Impressions: 20,
      StartDate: '2022-01-01',
      EndDate: '2022-01-02',
      Hovers: 2,
      Clicks: 2,
      CTR: '10.00%',
      Spend: '0.02',
      SpendVal: '$0.02',
    });
  });

  it('getBroadstreetByDayOfWeek', async () => {
    const result: BroadstreetByDayOfWeek[] =
      await service.getBroadstreetByDayOfWeek(params);

    expect(result).toContainEqual({
      AnalyticsType: AnalyticsType.BROADSTREET,
      Day: 'Saturday',
      Impressions: 10,
      Clicks: 1,
      Hovers: 1,
      ImpressionPercent: '50.00%',
      CTR: '10.00%',
    });
  });

  it('getBroadstreetByDate', async () => {
    const result: BroadstreetByDate[] = await service.getBroadstreetByDate(
      params,
    );

    expect(result).toContainEqual({
      AnalyticsType: AnalyticsType.BROADSTREET,
      Date: '2022-01-01',
      Impressions: 10,
      Clicks: 1,
      Hovers: 1,
      CTR: '10.00%',
    });
  });

  it('getBroadstreetByCreative', async () => {
    const result: BroadstreetByCreative[] =
      await service.getBroadstreetByCreative(params);

    expect(result).toContainEqual({
      CreativeId: 2,
      CreativeName: 'creative_name 2',
      Impressions: 20,
      Hovers: 2,
      Clicks: 2,
      CTR: '10.00%',
    });
  });
});
