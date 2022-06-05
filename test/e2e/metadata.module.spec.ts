import { HttpServer, INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { GraphQLFormattedError } from 'graphql';
import * as request from 'supertest';

import { AppModule } from '@api/app.module';
import { Advertiser } from '@api/graphql.schema';

jest.setTimeout(10_000);
const GRAPHQL_URL = '/graphql';

describe('AdvertiserResolver', () => {
  let app: TestingModule;
  let nestApp: INestApplication;
  let server: HttpServer;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    nestApp = app.createNestApplication();
    await nestApp.init();
    server = nestApp.getHttpServer();
  });

  afterAll(async () => await nestApp.close());

  it('AdvertiserResolver', async () => {
    const result = await request(server).post(GRAPHQL_URL).send({
      query: '{ advertiser(originId: "1") { name id campaigns { name } }}',
    });

    const data: {
      data: Advertiser;
      error: { errors: GraphQLFormattedError[] };
    } = result.body;

    expect(data).not.toHaveProperty('error');
    expect(data.data).toMatchSnapshot();
  });
});
