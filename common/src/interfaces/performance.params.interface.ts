import { IntervalParam } from './interval.interface';

export interface PerformanceParams extends IntervalParam {
  campaignIds: number[];
}

export interface PerformanceParamsWithConfig
  extends PerformanceParams,
    PerformanceConfig {}

export interface PerformanceConfig {
  byDayTableName: string;
  byMonthTableName: string;
  overallTableName: string;

  groupByPropertyNames: Conformity[];
  sumPropertyNames: Conformity[];
}

export interface Conformity {
  databaseVarName: string;
  outputVarName: string;
}
