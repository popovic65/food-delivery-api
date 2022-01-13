import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodService } from 'src/food/food.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating) private ratingsRepo: Repository<Rating>,
    private foodService: FoodService,
  ) {}
  async create(createRatingDto: CreateRatingDto, user: User) {
    const rating = createRatingDto.rating;
    const food_id = createRatingDto.food_id;
    const food = await this.foodService.findOne(food_id);

    const isAlreadyRated = await this.findWithUserAndFoodID(food_id, user.id);
    if (isAlreadyRated === true) {
      throw new BadRequestException('Already rated this food');
    } else {
      const newRating = await this.ratingsRepo.create({
        rating,
        food,
        user,
      });

      await this.ratingsRepo.save(newRating);
      return newRating;
    }
  }
  async findWithUserAndFoodID(foodID: number, userID: number) {
    const rating = await this.ratingsRepo.find({
      where: { user: userID, food: foodID },
      relations: ['user', 'food'],
    });

    if (rating.length > 0) {
      return true;
    } else return false;
  }

  async update(id: number, rating: UpdateRatingDto) {
    await this.ratingsRepo.update(id, rating);
    const updatedPost = await this.ratingsRepo.findOne(id, {
      relations: ['food', 'user'],
    });

    if (updatedPost) {
      return updatedPost;
    }
    throw new BadRequestException('Rating not found');
  }
}
