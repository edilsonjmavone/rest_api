import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Post } from "./Post";

@Entity("Users")
export class User {
  @PrimaryColumn("uuid")
  readonly id!: string;

  @Column("varchar", { length: 40 })
  name!: string;

  @Column("varchar", { length: 100 })
  email!: string;

  @Column("varchar", { length: 200 })
  password!: string;

  @Column("varchar", { length: 250, nullable: true })
  refreshToken!: string;

  @CreateDateColumn()
  created_at!: Date;

  @DeleteDateColumn({ nullable: true })
  _deleted!: string;

  @OneToMany(
    () => Post,
    post => post.user,
    { cascade: true }
  )
  posts!: Post[];

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
