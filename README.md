# Code Samples

## Installation

```bash
npm ci
```

## Requirements

RabbitMQ

```bash
docker run -d --name rabbit-local -p 5672:5672 -p 15672:15672 rabbitmq:3.7.7-management
```

MySQL

```bash
docker run --name local-mysql -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -e MYSQL_DATABASE=data-api -d mysql:8.0.23
```

## Setup

```bash
cp .env.example .env
```

## DB Migrations

```bash
npm run db:deploy
npm run db:generate
npm run db:seed
```

## Running the app in dev mode

```bash
npm run start:dev api-gateway
```
