import { SpendType } from '@prisma/client';

export const getSpendData = (
  impressions: number,
  campaigns: { spendType: SpendType; spendRate: number }[],
): { spend: string; spendVal: string } => {
  const costForThousandImpressions = campaigns[0].spendRate;
  const spend = (impressions / 1000) * costForThousandImpressions;

  return campaigns.some((c) => c.spendType === SpendType.Hide)
    ? { spend: '0', spendVal: 'NA' }
    : { spend: spend.toFixed(2), spendVal: '$' + spend.toFixed(2) };
};
