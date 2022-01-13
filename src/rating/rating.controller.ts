import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { GetAuthenticatedUser } from 'src/user/decorator/get-user.decoratior';
import { User } from 'src/user/entities/user.entity';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async create(
    @Body() createRatingDto: CreateRatingDto,
    @GetAuthenticatedUser() user: User,
  ) {
    return this.ratingService.create(createRatingDto, user);
  }
  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    return this.ratingService.update(+id, updateRatingDto);
  }
}
