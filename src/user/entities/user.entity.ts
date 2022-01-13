import { Rating } from 'src/rating/entities/rating.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import Role from '../guard/role.enum';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column('decimal')
  lat: number;
  @Column('decimal')
  long: number;
  @Column({ unique: true })
  username: string;
  @Column({ select: false })
  password: string;
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @OneToMany(() => Rating, (rating: Rating) => rating.user)
  @JoinColumn()
  ratings: Rating[];

  @OneToMany(() => Comment, (comment: Comment) => comment.user)
  @JoinColumn()
  comments: Comment[];
}
