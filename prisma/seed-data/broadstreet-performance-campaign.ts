import { broadstreet_performance_campaign } from '@prisma/client';

export const performanceCampaignsSeed: broadstreet_performance_campaign[] = [
  {
    campaign_id: 1,
    date: new Date('2022-01-01'),
    views: 10,
    hovers: 1,
    clicks: 1,
  },
  {
    campaign_id: 1,
    date: new Date('2022-01-02'),
    views: 10,
    hovers: 1,
    clicks: 1,
  },
];
