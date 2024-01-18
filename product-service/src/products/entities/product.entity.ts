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
  @Column({ type: 'varchar' , name: 'product_name'})
  productName: string;

  @AutoMap()
  @Column({ type: 'float' ,name: 'price'})
  price: number;


  @AutoMap()
  @Column({ type: 'uuid' ,name: 'user_id'})
  userId: string;
}
export enum SortingOption {
  price = 'price',
  productName = 'product_name',
}