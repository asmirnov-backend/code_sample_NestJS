import { BroadstreetPerformanceService } from './broadstreet.performance.service';
import {
  Broadstreet,
  BroadstreetTotal,
  BroadstreetByDayOfWeek,
  BroadstreetByDate,
  BroadstreetByCreative,
} from './interfaces/broadstreet.output.interface';

import { DATE_FORMAT } from '@common/consts/date-format.const';
import { CampaignsWithInterval } from '@common/interfaces/campaign-with-interval.interface';
import { calcPercentage } from '@common/utils/calc-percentage';
import { getSpendData } from '@common/utils/get-spend-data';

import { Injectable } from '@nestjs/common';
import { AnalyticsType } from '@prisma/client';
import { groupBy, map, max, min, sumBy } from 'lodash';

@Injectable()
export class BroadstreetService {
  constructor(private readonly performance: BroadstreetPerformanceService) {}

  public async getBroadstreet(
    params: CampaignsWithInterval,
  ): Promise<Broadstreet> {
    return {
      TabName: AnalyticsType.BROADSTREET,
      DayOfWeekImpression: await this.getBroadstreetByDayOfWeek(params),
      ByDateImpression: await this.getBroadstreetByDate(params),
      CreativeList: await this.getBroadstreetByCreative(params),
    };
  }

  public async getBroadstreetTotal(
    params: CampaignsWithInterval,
  ): Promise<BroadstreetTotal> {
    const performance = await this.performance.getBroadstreetPerformanceCommon({
      campaignIds: params.campaigns.map((e) => e.originId),
      interval: params.interval,
    });

    const impressions = sumBy(performance, 'impressions');
    const hovers = sumBy(performance, 'hovers');
    const clicks = sumBy(performance, 'clicks');
    const ctr = calcPercentage(clicks, impressions);

    const spendData = getSpendData(
      impressions,
      params.campaigns.map((e) => ({
        spendRate: Number(e.spendRate),
        spendType: e.spendType,
      })),
    );

    const dates = map(performance, 'date');
    const start = min(dates)?.toFormat(DATE_FORMAT);
    const end = max(dates)?.toFormat(DATE_FORMAT);

    return {
      AnalyticsType: AnalyticsType.BROADSTREET,
      Impressions: impressions,
      StartDate: start,
      EndDate: end,
      Hovers: hovers,
      Clicks: clicks,
      CTR: ctr,
      Spend: spendData.spend,
      SpendVal: spendData.spendVal,
    };
  }

  public async getBroadstreetByDayOfWeek(
    params: CampaignsWithInterval,
  ): Promise<BroadstreetByDayOfWeek[]> {
    const performance = await this.performance.getBroadstreetPerformanceCommon({
      campaignIds: params.campaigns.map((e) => e.originId),
      interval: params.interval,
    });

    const allImpressions = sumBy(performance, 'impressions');
    const groupByWeekday = groupBy(
      performance,
      (row) => row.date.setLocale('en').weekdayLong,
    );

    return map(groupByWeekday, (data, weekday) => {
      const impressions = sumBy(data, 'impressions');
      const clicks = sumBy(data, 'clicks');

      return {
        AnalyticsType: AnalyticsType.BROADSTREET,
        Day: weekday,
        Impressions: impressions,
        Clicks: clicks,
        Hovers: sumBy(data, 'hovers'),
        ImpressionPercent: calcPercentage(impressions, allImpressions),
        CTR: calcPercentage(clicks, impressions),
      };
    });
  }

  public async getBroadstreetByDate(
    params: CampaignsWithInterval,
  ): Promise<BroadstreetByDate[]> {
    const performance = await this.performance.getBroadstreetPerformanceCommon({
      campaignIds: params.campaigns.map((e) => e.originId),
      interval: params.interval,
    });

    return performance.map((row) => ({
      AnalyticsType: AnalyticsType.BROADSTREET,
      Date: row.date.toFormat(DATE_FORMAT),
      Impressions: row.impressions,
      Clicks: row.clicks,
      Hovers: row.hovers,
      CTR: calcPercentage(row.clicks, row.impressions),
    }));
  }

  public async getBroadstreetByCreative(
    params: CampaignsWithInterval,
  ): Promise<BroadstreetByCreative[]> {
    const performance =
      await this.performance.getBroadstreetPerformanceByCreatives({
        campaignIds: params.campaigns.map((e) => e.originId),
        interval: params.interval,
      });

    return performance.map((row) => ({
      CreativeId: row.creativeId,
      CreativeName: row.creativeName,
      Impressions: row.impressions,
      Hovers: row.hovers,
      Clicks: row.clicks,
      CTR: calcPercentage(row.clicks, row.impressions),
    }));
  }
}
