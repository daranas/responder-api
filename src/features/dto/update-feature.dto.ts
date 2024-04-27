import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateFeatureDto } from './create-feature.dto';

export class UpdateFeatureDto extends PartialType(CreateFeatureDto) {
  @IsString()
  name: string;
}
