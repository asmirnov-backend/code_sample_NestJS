import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';

import { BroadstreetModule } from '@api/broadstreet/broadstreet.module';
import { Broadstreet } from '@api/broadstreet/interfaces/broadstreet.output.interface';

jest.setTimeout(10_000);

describe('BroadstreetModule', () => {
  let app: TestingModule;
  let nestApp: INestApplication;
  let server;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), BroadstreetModule],
    }).compile();

    nestApp = app.createNestApplication();
    await nestApp.init();
    server = nestApp.getHttpServer();
  });

  afterAll(async () => await nestApp.close());

  it('/broadstreet', async () => {
    const result = await request(server).get(
      '/broadstreet?advertiserId=1&campaignIds=1',
    );

    const data: Broadstreet = result.body;
    expect(data).toMatchSnapshot();
  });
});
