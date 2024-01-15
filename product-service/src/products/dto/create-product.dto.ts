/* eslint-disable prettier/prettier */
import { OmitType } from "@nestjs/mapped-types";
import { Product } from "../entities/product.entity";

export class CreateProductDto extends OmitType(Product, ['productId'] as const){}
