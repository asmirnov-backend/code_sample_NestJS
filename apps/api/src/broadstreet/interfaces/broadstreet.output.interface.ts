import { AnalyticsType } from '@prisma/client';

export interface Broadstreet {
  TabName: AnalyticsType;
  DayOfWeekImpression: BroadstreetByDayOfWeek[];
  ByDateImpression: BroadstreetByDate[];
  CreativeList: BroadstreetByCreative[];
}

export interface BroadstreetByDate {
  AnalyticsType: AnalyticsType;
  Date: string;
  Impressions: number;
  Clicks: number;
  Hovers: number;
  CTR: string;
}

export interface BroadstreetByCreative {
  CreativeId: number;
  CreativeName: string;
  Impressions: number;
  Hovers: number;
  Clicks: number;
  CTR: string;
}

export interface BroadstreetByDayOfWeek {
  AnalyticsType: AnalyticsType;
  Day: string;
  Impressions: number;
  Clicks: number;
  Hovers: number;
  ImpressionPercent: string;
  CTR: string;
}

export interface BroadstreetTotal {
  AnalyticsType: AnalyticsType;
  Impressions: number;
  StartDate?: string;
  EndDate?: string;
  Hovers: number;
  Clicks: number;
  CTR: string;
  Spend: string;
  SpendVal: string;
}
