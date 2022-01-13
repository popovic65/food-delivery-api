import { Comment } from 'src/comment/entities/comment.entity';
import { Order } from 'src/order/entities/order.entity';
import { Rating } from 'src/rating/entities/rating.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  foodId: number;
  @Column()
  name: string;
  @Column('decimal')
  price: number;
  @Column()
  picture: string;

  @OneToMany(() => Rating, (rating: Rating) => rating.food, {
    cascade: true,
  })
  ratings: Rating[];

  @OneToMany(() => Comment, (comment: Comment) => comment.food, {
    cascade: true,
  })
  @JoinColumn()
  comments: Comment[];

  @ManyToMany(() => Order)
  orders: Order[];
}
