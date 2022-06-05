import { NotFoundException } from '@nestjs/common';

export class CampaignNotFoundException extends NotFoundException {
  constructor(campaignId: string) {
    super(`Not found campaign with id=${campaignId}`);
  }
}
