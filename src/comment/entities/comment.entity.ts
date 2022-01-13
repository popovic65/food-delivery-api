import { Food } from 'src/food/entities/food.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column()
  comment: string;

  @ManyToOne(() => User, (user: User) => user.comments, {
    lazy: true,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Food, (food: Food) => food.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'food_id', referencedColumnName: 'foodId' })
  food: Food;
}
