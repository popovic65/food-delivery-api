import { Request } from 'express';

import { Food } from '../entities/food.entity';

export interface RequestFood extends Request {
  food: Food;
}
