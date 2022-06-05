import { AnalyticsType, Campaign } from '@prisma/client';

export const campaignsSeed: Campaign[] = [
  {
    id: 1,
    originId: 1,
    name: 'name 1',
    friendlyName: 'friendlyName',
    spendRate: 1.1,
    spendType: 'CPM',
    contractStart: '2022-01-01',
    contractEnd: '2022-02-01',
    type: AnalyticsType.BROADSTREET,
    advertiserId: 1,
  },
];
