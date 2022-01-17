import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("Posts")
export class Post {
  @PrimaryColumn("uuid")
  readonly id!: string;

  @Column()
  text!: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(
    () => User,
    user => user.posts,
    { onDelete: "CASCADE" }
  )
  user!: User;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
