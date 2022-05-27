import { Daterange } from '@common/consts/daterange.enum';

export interface IntervalParam {
  interval?: { start?: string; end?: string; dateRange?: Daterange };
}
