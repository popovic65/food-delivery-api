import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { FoodService } from 'src/food/food.service';
import { Food } from 'src/food/entities/food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Food])],
  controllers: [CommentController],
  providers: [CommentService, FoodService],
})
export class CommentModule {}
