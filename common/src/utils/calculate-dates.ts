import { DATE_FORMAT } from '@common/consts/date-format.const';
import { Daterange } from '@common/consts/daterange.enum';
import { isUndefined } from 'lodash';
import { DateTime } from 'luxon';
import { IntervalParam } from '../interfaces/interval.interface';

export const calculateDatesForPerformanceByDay = (
  params: IntervalParam,
): { gte: Date; lte: Date } => {
  const [start, end] = calculateDates({
    startDate: params.interval?.start,
    endDate: params.interval?.end,
    dateRange: params.interval?.dateRange,
  });
  const startDate = DateTime.fromISO(start).toJSDate();
  const endDate = DateTime.fromISO(end).endOf('day').toJSDate();

  return { gte: startDate, lte: endDate };
};

export const calculateDates = (input: {
  dateRange?: Daterange;
  startDate?: string;
  endDate?: string;
}): [string, string] => {
  if (input.startDate && input.endDate) {
    return [input.startDate, input.endDate];
  }

  return getDatesByDateRange(input.dateRange);
};

export const getDatesByDateRange = (
  dateRange?: Daterange,
): [string, string] => {
  if (dateRange === Daterange.ALL_TIME || isUndefined(dateRange)) {
    return ['2019-01-01', DateTime.local().toFormat(DATE_FORMAT)];
  }

  if (dateRange === Daterange.LAST_30_DAYS) {
    return [
      DateTime.local().minus({ days: 30 }).toFormat(DATE_FORMAT),
      DateTime.local().toFormat(DATE_FORMAT),
    ];
  }

  if (dateRange === Daterange.LAST_MONTH) {
    return [
      DateTime.local()
        .minus({ month: 1 })
        .startOf('month')
        .toFormat(DATE_FORMAT),
      DateTime.local().minus({ month: 1 }).endOf('month').toFormat(DATE_FORMAT),
    ];
  }

  if (dateRange === Daterange.LAST_WEEK) {
    return [
      DateTime.local().minus({ week: 1 }).startOf('week').toFormat(DATE_FORMAT),
      DateTime.local().minus({ week: 1 }).endOf('week').toFormat(DATE_FORMAT),
    ];
  }

  if (dateRange === Daterange.LAST_YEAR) {
    return [
      DateTime.local().minus({ year: 1 }).startOf('year').toFormat(DATE_FORMAT),
      DateTime.local().minus({ year: 1 }).endOf('year').toFormat(DATE_FORMAT),
    ];
  }

  if (dateRange === Daterange.THIS_MONTH) {
    return [
      DateTime.local().startOf('month').toFormat(DATE_FORMAT),
      DateTime.local().toFormat(DATE_FORMAT),
    ];
  }

  if (dateRange === Daterange.THIS_WEEK) {
    return [
      DateTime.local().startOf('week').toFormat(DATE_FORMAT),
      DateTime.local().toFormat(DATE_FORMAT),
    ];
  }

  if (dateRange === Daterange.THIS_YEAR) {
    return [
      DateTime.local().startOf('year').toFormat(DATE_FORMAT),
      DateTime.local().toFormat(DATE_FORMAT),
    ];
  }

  if (dateRange === Daterange.TWO_MONTH_AGO) {
    return [
      DateTime.local()
        .minus({ months: 2 })
        .startOf('month')
        .toFormat(DATE_FORMAT),
      DateTime.local()
        .minus({ months: 2 })
        .endOf('month')
        .toFormat(DATE_FORMAT),
    ];
  }

  if (dateRange === Daterange.YESTERDAY) {
    return [
      DateTime.local().minus({ day: 1 }).toFormat(DATE_FORMAT),
      DateTime.local().minus({ day: 1 }).toFormat(DATE_FORMAT),
    ];
  }

  throw new Error(`Received dateRange ${dateRange} unknown`);
};
