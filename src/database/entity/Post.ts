import { Entity, Column, PrimaryColumn, ManyToOne, IsNull } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("Posts")
export class Post {
  @PrimaryColumn("uuid")
  readonly id!: string;
  @Column()
  text!: string;
  @ManyToOne(
    () => User,
    user => user.posts,
    { onDelete: "CASCADE" }
  )
  user!: User;
  //TODO: understand and fix this thing
  constructor() {
    if (!this.id) this.id = uuid();
  }
}
