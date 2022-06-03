import { ConfigModule } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import { AnalyticsType, SpendType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

import { MetadataService } from '@api/metadata/metadata.service';
import { PrismaModule } from '@api/prisma/prisma.module';

describe('MetadataService', () => {
  let service: MetadataService;
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
      providers: [MetadataService],
    }).compile();

    service = app.get<MetadataService>(MetadataService);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAdvertiser', async () => {
    const result = await service.getAdvertiser('1');

    expect(result).toEqual({
      id: BigInt(1),
      name: 'advertiser 1',
      originId: '1',
    });
  });

  it('getCampaigns', async () => {
    const result = await service.getCampaigns({
      advertiserId: BigInt(1),
      campaignOriginIds: [1],
    });

    expect(result).toEqual([
      {
        advertiserId: BigInt(1),
        contractEnd: '2022-02-01',
        contractStart: '2022-01-01',
        friendlyName: 'friendlyName',
        id: BigInt(1),
        name: 'name 1',
        originId: 1,
        spendRate: new Decimal(1.1),
        spendType: SpendType.CPM,
        type: AnalyticsType.BROADSTREET,
      },
    ]);
  });
});
