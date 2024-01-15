/* eslint-disable prettier/prettier */
import { DataSource } from "typeorm";
import { Product } from "./entities/product.entity";


export const productProviders = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (datSource:DataSource) => datSource.getRepository(Product),
        inject: ['DATA_SOURCE']
  },
  
]