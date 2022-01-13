import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { GetAuthenticatedUser } from 'src/user/decorator/get-user.decoratior';
import { User } from 'src/user/entities/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(
    @Body() createCommentDto: CreateCommentDto,
    @GetAuthenticatedUser() user: User,
  ) {
    return this.commentService.create(createCommentDto, user);
  }
}
