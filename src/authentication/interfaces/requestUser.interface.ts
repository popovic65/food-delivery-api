import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

export interface RequestUser extends Request {
  user: User;
}
