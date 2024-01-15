/* eslint-disable prettier/prettier */
import { v4 as uuid  } from 'uuid';
import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class User extends BaseEntity{

  constructor(id: string, email: string, password: string, status: string) {
    super();
    this.userId = id;
    this.email = email;
    this.password = password;
    this.status = status;
    
    }
    @PrimaryGeneratedColumn('uuid')
  userId: string;
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
