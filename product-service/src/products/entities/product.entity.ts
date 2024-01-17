/* eslint-disable prettier/prettier */
import { v4 as uuid  } from 'uuid';
import { BaseEntity, Column, Double, Entity, PrimaryGeneratedColumn } from "typeorm";

import { AutoMap } from "@automapper/classes";

@Entity()
export class Product {


  @AutoMap()
  @PrimaryGeneratedColumn()
  productId: number;
  

  @AutoMap()
  @Column({ type: 'varchar' })
  productName: string;

  @AutoMap()
  @Column({ type: 'float' })
  price: number;


  @AutoMap()
  @Column({ type: 'uuid' })
  userId: string;
}
