/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Mapper, createMap, createMapper, forMember, ignore } from "@automapper/core";
import { CreateProductDto } from "./create-product.dto";
import { Product } from "../entities/product.entity";
import { UpdateProductDto } from "./update-product.dto";

@Injectable()
export class ProductMapper extends AutomapperProfile{
    constructor(
        @((InjectMapper as any)()) mapper: Mapper
    ){
        super(mapper);
    }

    override get profile(){
        return (mapper: Mapper) => {
            createMap(mapper, CreateProductDto, Product, forMember(dest => dest.productId, ignore()))
            createMap(mapper, UpdateProductDto, Product)
            createMap(mapper, Product, CreateProductDto )
            createMap(mapper, UpdateProductDto, Product)
            createMap(mapper, Product, UpdateProductDto)
        }

    }
}