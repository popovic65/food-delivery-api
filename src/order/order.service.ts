import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodService } from 'src/food/food.service';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { User } from 'src/user/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    private restaurantService: RestaurantService,
    private foodService: FoodService,
  ) {}
  async create(foodIds: Array<number>, user: User) {
    const restaurant = await getRepository(Restaurant)
      .createQueryBuilder()
      .select('restaurant')
      .from(Restaurant, 'restaurant')
      .where('restaurant.delivering = false')
      .orderBy(
        `SQRT( POWER(${user.lat} - restaurant.lat, 2) + POWER(${user.long} - restaurant.long, 2))`,
      )
      .limit(1)
      .getOne();

    if (restaurant) {
      restaurant.delivering = true;
      await this.restaurantService.create(restaurant);

      const food = await this.foodService.findByIds(foodIds);

      const newOrder = this.orderRepo.create({
        userId: user.id,
        restaurant,
        food,
      });
      return await this.orderRepo.save(newOrder);
    } else {
      throw new BadRequestException('Your order is canceled');
    }
  }
  @Cron(CronExpression.EVERY_MINUTE)
  async is_delivered() {
    const restaurants = await getRepository(Restaurant)
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.orders', 'order')
      .where('restaurant.delivering = :delivering', { delivering: true })
      .andWhere("age(now(), order.createdAt) < '16 minutes' ")
      .andWhere("age(now(), order.createdAt) >= '15 minutes' ")
      .getMany();

    if (!restaurants.length) {
      return;
    } else {
      const restaurantIds = restaurants.map((restaurant) => restaurant.id);

      return await getRepository(Restaurant)
        .createQueryBuilder()
        .update(Restaurant)
        .set({ delivering: false })
        .where('id in (:...ids)', { ids: restaurantIds })
        .execute();
    }
  }
}
