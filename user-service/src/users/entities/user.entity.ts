import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class User extends BaseEntity{

  @PrimaryGeneratedColumn({ comment: 'uniqe primary key' })
  userId: UUID;
  @Column({
    type: 'varchar'
  })
  email: string;

  @Column({
    type: 'varchar'
  })
  password: string;
  @Column({
    type: 'varchar',
  })
  status: string;
}
