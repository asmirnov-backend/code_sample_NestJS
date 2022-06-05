import { NotFoundException } from '@nestjs/common';

export class AdvertiserNotFoundException extends NotFoundException {
  constructor(advertiserId: string | number | bigint) {
    super(`Advertiser with id=${advertiserId} not found`);
  }
}
