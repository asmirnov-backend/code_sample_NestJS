import { DateTime } from 'luxon';

export interface BroadstreetPerformance {
  date: DateTime;
  impressions: number;
  clicks: number;
  hovers: number;
}

export interface BroadstreetPerformanceByCreatives {
  creativeId: number;
  creativeName: string;
  impressions: number;
  clicks: number;
  hovers: number;
}
