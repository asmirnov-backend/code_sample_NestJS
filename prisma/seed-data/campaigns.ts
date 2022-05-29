import { AnalyticsType, Campaign } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export const campaignsSeed: Campaign[] = [
  {
    id: BigInt(1),
    originId: 1,
    name: 'name 1',
    friendlyName: 'friendlyName',
    spendRate: new Decimal(1.1),
    spendType: 'CPM',
    contractStart: '2022-01-01',
    contractEnd: '2022-02-01',
    type: AnalyticsType.BROADSTREET,
    advertiserId: BigInt(1),
  },
];
