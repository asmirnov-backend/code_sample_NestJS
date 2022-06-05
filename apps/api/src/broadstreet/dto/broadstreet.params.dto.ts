import { Transform } from 'class-transformer';
import { ArrayNotContains, IsString } from 'class-validator';

export class BroadstreetQueryParamsDto {
  @IsString()
  readonly advertiserId: string;

  @Transform(({ value }) => value.split(',').map(Number))
  @ArrayNotContains([NaN])
  readonly campaignIds: number[];
}
