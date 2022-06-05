import { IntervalParam } from './interval.interface';

import { Campaign } from '@prisma/client';

export interface CampaignsWithInterval extends IntervalParam {
  campaigns: Campaign[];
}
