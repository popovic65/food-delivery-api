import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { Food } from './entities/food.entity';

@Injectable()
export class FoodService {
  constructor(@InjectRepository(Food) private foodRepo: Repository<Food>) {}

  async create(createFoodDto: CreateFoodDto) {
    const newFood = await this.foodRepo.save(createFoodDto);
    return newFood;
  }

  async findAll() {
    return await this.foodRepo.find();
  }
  async findByIds(ids: Array<number>) {
    return await this.foodRepo.findByIds(ids);
  }
  async findOne(id: number) {
    const food = await this.foodRepo.findOne(id);
    if (food) {
      return food;
    }
    throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: number) {
    await getRepository(Food)
      .createQueryBuilder('food')
      .delete()
      .from(Food)
      .where('foodId = :id', { id: id })
      .execute();
  }

  async listFoodByRating() {
    const foodratings = await getRepository(Food)
      .createQueryBuilder('food')
      .leftJoinAndSelect('food.ratings', 'rating')
      .orderBy('rating', 'DESC')
      .getMany();

    return foodratings;
  }
}
