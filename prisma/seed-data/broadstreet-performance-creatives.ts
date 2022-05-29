import { broadstreet_performance_creatives } from '@prisma/client';

export const performanceCreativesSeed: broadstreet_performance_creatives[] = [
  {
    campaign_id: BigInt(1),
    date: new Date('2022-01-01'),
    creative_name: 'creative_name 1',
    creative_id: BigInt(1),
    views: BigInt(10),
    hovers: BigInt(1),
    clicks: BigInt(1),
  },
  {
    campaign_id: BigInt(1),
    date: new Date('2022-01-01'),
    creative_name: 'creative_name 2',
    creative_id: BigInt(2),
    views: BigInt(10),
    hovers: BigInt(1),
    clicks: BigInt(1),
  },
  {
    campaign_id: BigInt(1),
    creative_name: 'creative_name 2',
    creative_id: BigInt(2),
    date: new Date('2022-01-02'),
    views: BigInt(10),
    hovers: BigInt(1),
    clicks: BigInt(1),
  },
];
