import { Food } from 'src/food/entities/food.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;
  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;
  @Column({ default: false })
  canceled: boolean;

  @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.orders, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @ManyToMany(() => Food, {
    cascade: true,
  })
  @JoinTable({
    joinColumn: {
      name: 'order_id',
      referencedColumnName: 'orderId',
    },
    inverseJoinColumn: {
      name: 'food_id',
      referencedColumnName: 'foodId',
    },
  })
  food: Food[];
}
