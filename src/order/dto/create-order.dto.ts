import { IsArray } from 'class-validator';
import { Food } from 'src/food/entities/food.entity';

export class CreateOrderDto {
  @IsArray()
  foodIds: number[];
}
