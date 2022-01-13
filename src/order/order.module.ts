import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UserService } from 'src/user/user.service';
import { FoodService } from 'src/food/food.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { User } from 'src/user/entities/user.entity';
import { Food } from 'src/food/entities/food.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Food, Restaurant])],
  controllers: [OrderController],
  providers: [OrderService, UserService, FoodService, RestaurantService],
})
export class OrderModule {}
