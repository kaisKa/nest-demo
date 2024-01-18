/* eslint-disable prettier/prettier */
// import { v4 as uuidv4 } from 'uuid';
import { AutoMap } from "@automapper/classes";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Users extends BaseEntity {

  // constructor(id: string, email: string, password: string, status: string) {
  //   super();
  //   this.userId = id;
  //   this.email = email;
  //   this.password = password;
  //   this.status = status;

  //   }
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @AutoMap()
  @Column({
    type: 'varchar'
  })
  email: string;

  @AutoMap()
  @Column({
    type: 'varchar', length: 2048
  })
  password: string;

  @AutoMap()
  @Column({
    type: 'varchar',
  })
  status: string;

  @CreateDateColumn()
  createdAt: string
}
