import { Food } from 'src/food/entities/food.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  ratingId: number;

  @Column('decimal')
  rating: number;

  @ManyToOne(() => User, (user: User) => user.ratings, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Food, (food: Food) => food.ratings, {
    onDelete: 'CASCADE',
  })
  food: Food;
}
