import { PrismaClient } from '@prisma/client';

import { advertisersSeed } from './seed-data/advertisers';
import { performanceCampaignsSeed } from './seed-data/broadstreet-performance-campaign';
import { performanceCreativesSeed } from './seed-data/broadstreet-performance-creatives';
import { campaignsSeed } from './seed-data/campaigns';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.advertiser.createMany({
    data: advertisersSeed,
  });

  await prisma.campaign.createMany({
    data: campaignsSeed,
  });

  await prisma.broadstreet_performance_campaign.createMany({
    data: performanceCampaignsSeed,
  });

  await prisma.broadstreet_performance_creatives.createMany({
    data: performanceCreativesSeed,
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
