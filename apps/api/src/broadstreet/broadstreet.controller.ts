import { Controller, Get, Query } from '@nestjs/common';

import { MetadataService } from '@api/metadata/metadata.service';

import { BroadstreetService } from './broadstreet.service';
import { BroadstreetQueryParamsDto } from './dto/broadstreet.params.dto';
import { Broadstreet } from './interfaces/broadstreet.output.interface';

@Controller()
export class BroadstreetController {
  constructor(
    private readonly broadstreet: BroadstreetService,
    private readonly metadata: MetadataService,
  ) {}

  @Get('/broadstreet')
  async getBroadstreet(
    @Query() query: BroadstreetQueryParamsDto,
  ): Promise<Broadstreet> {
    const advertiser = await this.metadata.getAdvertiser(query.advertiserId);

    const campaigns = await this.metadata.getCampaigns({
      advertiserId: advertiser!.id,
      campaignOriginIds: query.campaignIds.map((e) => Number(e)),
    });

    return this.broadstreet.getBroadstreet({
      campaigns: campaigns,
    });
  }
}
