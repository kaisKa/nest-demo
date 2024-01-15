/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  products: Array<Product> = [
    new Product('product1',  450,randomUUID()),
    new Product( 'product2', 250,randomUUID()),
    new Product( 'product3', 250,randomUUID()),
    new Product( 'product4', 250,randomUUID()),
    new Product( 'product5', 250,randomUUID()),
    new Product( 'product6', 250,randomUUID()),
    new Product( 'product7', 250,randomUUID()),

  ];

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>, 
  ){}


  create(createProductDto: Product) {
    this.productRepository.save(createProductDto)    
  }

  findAll() {

    // this.products.push();
    console.log(this.products[1])
    return this.products;
  }

  findOne(id: string) {
    
    return this.products.find((obj) => {
      return obj.productId === id;
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    // const result = this.findOne(id);
    return this.products.pop()
  }
}
