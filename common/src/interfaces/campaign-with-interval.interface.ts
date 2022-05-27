import { Campaign } from '@prisma/client';

import { IntervalParam } from './interval.interface';

export interface CampaignsWithInterval extends IntervalParam {
  campaigns: Campaign[];
}
