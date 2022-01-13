import { IsNumber } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  rating: number;
  @IsNumber()
  food_id: number;
}
