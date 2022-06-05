import { Transform } from 'class-transformer';
import { ArrayNotContains, IsString } from 'class-validator';

export class BroadstreetQueryParamsDto {
  @IsString()
  advertiserId: string;

  @Transform(({ value }) => value.split(',').map((e) => Number(e)))
  @ArrayNotContains([NaN])
  campaignIds: number[];
}
