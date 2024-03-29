import { BroadstreetService } from './broadstreet.service';
import { BroadstreetQueryParamsDto } from './dto/broadstreet.params.dto';
import { Broadstreet } from './interfaces/broadstreet.output.interface';

import { LoggingRequestInterceptor } from '@api/logging-request.interceptor';
import { AdvertiserNotFoundException } from '@api/metadata/exceptions/advertiser-not-found.exception';
import { MetadataService } from '@api/metadata/metadata.service';

import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { isNull } from 'lodash';

@Controller()
@UseInterceptors(LoggingRequestInterceptor)
export class BroadstreetController {
  constructor(
    private readonly broadstreet: BroadstreetService,
    private readonly metadata: MetadataService,
  ) {}

  @Get('/broadstreet')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getBroadstreet(
    @Query() query: BroadstreetQueryParamsDto,
  ): Promise<Broadstreet> {
    const advertiser = await this.metadata.getAdvertiser(query.advertiserId);

    if (isNull(advertiser)) {
      throw new AdvertiserNotFoundException(query.advertiserId);
    }

    const campaigns = await this.metadata.getCampaigns({
      advertiserId: advertiser.id,
      campaignOriginIds: query.campaignIds,
    });

    return this.broadstreet.getBroadstreet({
      campaigns: campaigns,
    });
  }
}
