import { IsDecimal, IsNumber, Max, Min } from 'class-validator';

export class CreateRestaurantDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  long: number;
}
