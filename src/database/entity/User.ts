import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("Users")
export class User {
  @PrimaryColumn()
  readonly id!: string;

  @Column("varchar", { length: 40 })
  name!: string;

  @Column("varchar", { length: 100 })
  email!: string;

  @Column("varchar", { length: 7 })
  _deleted!: string;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
