import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({ default: true })
  isPending: boolean;

  @Column()
  dueDate: Date;

  @ManyToOne(() => User, user => user.tasks)
  user: User;
}
