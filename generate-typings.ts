import { join } from 'path';

import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./apps/api/**/*.graphql'],
  path: join(process.cwd(), '/apps/api/src/graphql.schema.ts'),
});
