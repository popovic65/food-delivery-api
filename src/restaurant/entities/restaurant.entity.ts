import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('decimal')
  lat: number;
  @Column('decimal')
  long: number;

  @Column({ default: false })
  delivering: boolean;

  @OneToMany(() => Order, (order: Order) => order.restaurant, {
    cascade: true,
    eager: true,
  })
  orders: Order[];
}
