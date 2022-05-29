import { broadstreet_performance_campaign } from '@prisma/client';

export const performanceCampaignsSeed: broadstreet_performance_campaign[] = [
  {
    campaign_id: BigInt(1),
    date: new Date('2022-01-01'),
    views: BigInt(10),
    hovers: BigInt(1),
    clicks: BigInt(1),
  },
  {
    campaign_id: BigInt(1),
    date: new Date('2022-01-02'),
    views: BigInt(10),
    hovers: BigInt(1),
    clicks: BigInt(1),
  },
];
