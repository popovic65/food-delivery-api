import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import RoleGuard from 'src/user/guard/role.guard';
import Role from 'src/user/guard/role.enum';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @UseGuards(RoleGuard(Role.Admin))
  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }
  @UseGuards(RoleGuard(Role.Admin))
  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }
  @UseGuards(RoleGuard(Role.Admin))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.restaurantService.delete(+id);
  }
}
