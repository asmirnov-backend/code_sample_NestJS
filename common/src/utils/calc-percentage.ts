import { isNaN } from 'lodash';

export const calcPercentage = (
  part: number,
  total: number,
  fixed = 2,
): string => {
  if (isNaN(part / total)) {
    return '-';
  }

  return `${((part / total) * 100).toFixed(fixed)}%`;
};
