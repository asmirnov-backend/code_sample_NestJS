import { ConfigModule } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';

import { BroadstreetController } from '@api/broadstreet/broadstreet.controller';
import { BroadstreetModule } from '@api/broadstreet/broadstreet.module';

describe('BroadstreetController', () => {
  let controller: BroadstreetController;
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), BroadstreetModule],
    }).compile();

    controller = app.get<BroadstreetController>(BroadstreetController);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getBroadstreet', async () => {
    const result = await controller.getBroadstreet({
      advertiserId: '1',
      campaignIds: '1',
    });

    expect(result).toMatchSnapshot();
  });
});
