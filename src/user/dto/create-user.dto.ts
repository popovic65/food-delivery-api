import { string } from '@hapi/joi';
import {
  IsNumber,
  isString,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import Role from '../guard/role.enum';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  @IsString()
  username: string;
  @IsNumber()
  @Min(-180)
  @Max(180)
  lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  long: number;

  @IsString()
  @MinLength(8)
  password: string;

  role: Role;
}
