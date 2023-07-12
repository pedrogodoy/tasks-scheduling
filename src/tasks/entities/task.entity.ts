import { User } from "../../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  dueDate: string;

  @ManyToOne(() => User, user => user.tasks)
  user: User;
}
