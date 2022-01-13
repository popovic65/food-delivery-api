import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    TypeOrmModule.forFeature([Food]),
    MulterModule.register({
      dest: './src/food/uploads/',
    }),
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
