import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import RoleGuard from 'src/user/guard/role.guard';
import Role from 'src/user/guard/role.enum';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @UseGuards(RoleGuard(Role.Admin))
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/food/uploads',
        filename: (req, file, cb) => {
          let ext = file.originalname.substring(
            file.originalname.lastIndexOf('.'),
            file.originalname.length,
          );
          cb(null, Date.now() + ext);
        },
      }),
    }),
  )
  create(@Body() body: Object, @UploadedFile() file: Express.Multer.File) {
    try {
      const foodDto = <CreateFoodDto>JSON.parse(body['body']);
      const newFood = {
        ...foodDto,
        picture: '/food/uploads/' + file.filename,
      };

      return this.foodService.create(newFood);
    } catch (e) {
      console.log(e);
    }
  }
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll() {
    return this.foodService.findAll();
  }
  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(+id);
  }
  @UseGuards(JwtAuthenticationGuard)
  @Get('uploads/:fileId')
  async servePhoto(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile('/src/food/uploads/' + fileId, { root: '.' });
  }
  @UseGuards(RoleGuard(Role.Admin))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.foodService.delete(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/list/ratings')
  async getFoodByRating() {
    return this.foodService.listFoodByRating();
  }
}
