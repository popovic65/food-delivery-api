import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { FoodService } from 'src/food/food.service';
import { Food } from 'src/food/entities/food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Food])],
  controllers: [RatingController],
  providers: [RatingService, FoodService],
})
export class RatingModule {}
