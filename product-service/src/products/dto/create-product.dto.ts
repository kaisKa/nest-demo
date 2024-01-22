/* eslint-disable prettier/prettier */
import { OmitType } from "@nestjs/mapped-types";
import { Product } from "../entities/product.entity";
import {AutoMap} from '@automapper/classes'
import { ApiProperty } from "@nestjs/swagger";
export class CreateProductDto{
  

  @AutoMap()
  @ApiProperty()
  productName: string;

  @AutoMap()
  @ApiProperty()
  price: number;


  // @AutoMap()
  // @ApiProperty()
  // userId: string;
} //extends OmitType(Product, ['productId'] as const){}
