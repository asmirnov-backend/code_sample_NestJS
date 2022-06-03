import { Test } from '@nestjs/testing';
import { AnalyticsType, Campaign, SpendType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { DateTime } from 'luxon';

import { BroadstreetModule } from './broadstreet.module';
import { BroadstreetPerformanceService } from './broadstreet.performance.service';
import { BroadstreetService } from './broadstreet.service';

describe('BroadstreetService', () => {
  let service: BroadstreetService;
  let performanceService: BroadstreetPerformanceService;

  const params = {
    campaigns: [
      {
        originId: 1,
        spendRate: new Decimal(1.0),
        spendType: SpendType.CPM,
      } as Campaign,
    ],
  };

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [BroadstreetModule],
    }).compile();

    service = app.get<BroadstreetService>(BroadstreetService);
    performanceService = app.get<BroadstreetPerformanceService>(
      BroadstreetPerformanceService,
    );

    jest
      .spyOn(performanceService, 'getBroadstreetPerformanceCommon')
      .mockImplementation(async () => [
        {
          date: DateTime.fromISO('2022-01-01'),
          impressions: 10,
          clicks: 1,
          hovers: 1,
        },
        {
          date: DateTime.fromISO('2022-01-02'),
          impressions: 100,
          clicks: 10,
          hovers: 10,
        },
      ]);
    jest
      .spyOn(performanceService, 'getBroadstreetPerformanceByCreatives')
      .mockImplementation(async () => [
        {
          creativeId: 1,
          creativeName: 'foo1',
          impressions: 10,
          clicks: 1,
          hovers: 1,
        },
        {
          creativeId: 2,
          creativeName: 'foo2',
          impressions: 100,
          clicks: 10,
          hovers: 10,
        },
      ]);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getBroadstreetByDate', async () => {
    const result = await service.getBroadstreetByDate(params);
    expect(result).toEqual([
      {
        AnalyticsType: AnalyticsType.BROADSTREET,
        Date: '2022-01-01',
        Impressions: 10,
        Clicks: 1,
        Hovers: 1,
        CTR: '10.00%',
      },
      {
        AnalyticsType: AnalyticsType.BROADSTREET,
        Date: '2022-01-02',
        Impressions: 100,
        Clicks: 10,
        Hovers: 10,
        CTR: '10.00%',
      },
    ]);
  });

  it('getBroadstreetByDayOfWeek', async () => {
    const result = await service.getBroadstreetByDayOfWeek(params);
    expect(result).toEqual([
      {
        AnalyticsType: AnalyticsType.BROADSTREET,
        Day: 'Saturday',
        Impressions: 10,
        Clicks: 1,
        Hovers: 1,
        ImpressionPercent: '9.09%',
        CTR: '10.00%',
      },
      {
        AnalyticsType: AnalyticsType.BROADSTREET,
        Day: 'Sunday',
        Impressions: 100,
        Clicks: 10,
        Hovers: 10,
        ImpressionPercent: '90.91%',
        CTR: '10.00%',
      },
    ]);
  });

  it('getBroadstreetTotal', async () => {
    const result = await service.getBroadstreetTotal(params);
    expect(result).toEqual({
      AnalyticsType: AnalyticsType.BROADSTREET,
      Impressions: 110,
      StartDate: '2022-01-01',
      EndDate: '2022-01-02',
      Hovers: 11,
      Clicks: 11,
      CTR: '10.00%',
      Spend: '0.11',
      SpendVal: '$0.11',
    });
  });

  it('getBroadstreetByCreative', async () => {
    const result = await service.getBroadstreetByCreative(params);
    expect(result).toEqual([
      {
        CreativeId: 1,
        CreativeName: 'foo1',
        Impressions: 10,
        Hovers: 1,
        Clicks: 1,
        CTR: '10.00%',
      },
      {
        CreativeId: 2,
        CreativeName: 'foo2',
        Impressions: 100,
        Hovers: 10,
        Clicks: 10,
        CTR: '10.00%',
      },
    ]);
  });
});
