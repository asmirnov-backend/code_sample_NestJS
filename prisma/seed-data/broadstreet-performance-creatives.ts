import { broadstreet_performance_creatives } from '@prisma/client';

export const performanceCreativesSeed: broadstreet_performance_creatives[] = [
  {
    campaign_id: 1,
    date: new Date('2022-01-01'),
    creative_name: 'creative_name 1',
    creative_id: 1,
    views: 10,
    hovers: 1,
    clicks: 1,
  },
  {
    campaign_id: 1,
    date: new Date('2022-01-01'),
    creative_name: 'creative_name 2',
    creative_id: 2,
    views: 10,
    hovers: 1,
    clicks: 1,
  },
  {
    campaign_id: 1,
    creative_name: 'creative_name 2',
    creative_id: 2,
    date: new Date('2022-01-02'),
    views: 10,
    hovers: 1,
    clicks: 1,
  },
];
