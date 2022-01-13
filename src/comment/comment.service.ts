import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodService } from 'src/food/food.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    private foodService: FoodService,
  ) {}
  async create(createRatingDto: CreateCommentDto, user: User) {
    const comment = createRatingDto.comment;
    const food_id = createRatingDto.food_id;
    const food = await this.foodService.findOne(food_id);
    const newComment = await this.commentRepo.create({
      comment,
      food,
      user,
    });
    await this.commentRepo.save(newComment);
    return newComment;
  }
}
