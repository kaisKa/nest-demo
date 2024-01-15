/* eslint-disable prettier/prettier */
import { v4 as uuid  } from 'uuid';
import { BaseEntity, Column, Double, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor( productName: string, price: number, userId: string) {
    super();

    this.productName = productName;
    this.price = price;
    this.userId = userId;
    
    };


  @PrimaryGeneratedColumn('uuid')
  // @Column({ type: 'uuid' })
  productId: string;
  

  @Column({ type: 'varchar' })
  productName: string;

  @Column({ type: 'float' })
  price: number;


  @Column({ type: 'uuid' })
  userId: string;
}
