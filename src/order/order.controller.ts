import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { GetAuthenticatedUser } from 'src/user/decorator/get-user.decoratior';
import { User } from 'src/user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async createOrder(
    @Body() body: CreateOrderDto,
    @GetAuthenticatedUser() user: User,
  ) {
    return this.orderService.create(body.foodIds, user);
  }
}
