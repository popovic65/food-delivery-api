import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>,
  ) {}
  async create(createRestaurantDto: CreateRestaurantDto) {
    const newRestaurant = await this.restaurantRepo.save(createRestaurantDto);
    return newRestaurant;
  }

  async findAll() {
    return await this.restaurantRepo.find();
  }

  async delete(id: number) {
    return await this.restaurantRepo.delete(id);
  }
}
