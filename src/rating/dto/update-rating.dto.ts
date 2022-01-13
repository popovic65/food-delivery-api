import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateRatingDto } from './create-rating.dto';

export class UpdateRatingDto extends PartialType(CreateRatingDto) {
  @IsNumber()
  rating: number;
}
