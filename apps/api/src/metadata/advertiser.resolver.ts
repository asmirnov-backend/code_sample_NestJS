import { MetadataService } from './metadata.service';

import { Advertiser, Campaign, IQuery } from '@api/graphql.schema';

import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';

@Resolver('Advertiser')
export class AdvertiserResolver implements IQuery {
  constructor(private metadata: MetadataService) {}

  @Query()
  async advertiser(
    @Args('originId') originId: string,
  ): Promise<Advertiser | null> {
    return this.metadata.getAdvertiser(originId);
  }

  @ResolveField()
  async campaigns(@Parent() advertiser: Advertiser): Promise<Campaign[]> {
    return this.metadata.getCampaigns({
      advertiserId: advertiser.id,
    });
  }
}
