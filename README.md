# Code Samples

![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/asmirnov-backend/code_sample_NestJS)

## Setup

RabbitMQ

```bash
docker run -d --name rabbit-local -p 5672:5672 -p 15672:15672 rabbitmq:3.7.7-management
```

MySQL

```bash
docker run --name mysql-local -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -e MYSQL_DATABASE=data-api -d mysql:8.0.23
```

npm packages

```bash
npm ci
```

Environment

```bash
cp .env.example .env
```

Setup database tables

```bash
npm run db:deploy
```

Generate prisma typescript types

```bash
npm run db:generate
```

Generate GraphQL schema types (Shema first approach)

```bash
npm run graphql:generate-typings
```

## Running the app in dev mode

```bash
npm run start:dev api-gateway
```

## Tests

Seed test data to db

```bash
npm run db:seed
```

### Unit

```bash
npm run test:unit
```

### Integration

```bash
npm run test:integration
```

### E2E

```bash
npm run test:e2e
```
