import { Controller, Get } from '@nestjs/common';
import { SpendType, Campaign } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

import { BroadstreetService } from './broadstreet.service';
import { Broadstreet } from './interfaces/broadstreet.output.interface';

@Controller()
export class BroadstreetController {
  constructor(private readonly broadstreetService: BroadstreetService) {}

  @Get('/broadstreet')
  async getBroadstreet(): Promise<Broadstreet> {
    const mockCampaigns = [
      {
        originId: 1,
        contractStart: '2022-01-01',
        contractEnd: '2022-02-01',
        spendRate: new Decimal(1.2),
        spendType: SpendType.CPM,
      },
    ] as Campaign[];

    return this.broadstreetService.getBroadstreet({
      campaigns: mockCampaigns,
    });
  }
}
