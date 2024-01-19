/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs'
import { Mapper } from '@automapper/core';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { SortOrder, Sorting } from './sort.decorator';
import { Filtering } from './entities/filter.decorator';
import { getWhere } from './entities/typeorm.helper';

@Injectable()
export class ProductsService {



  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @((InjectMapper as any)()) private readonly classMapper: Mapper,
  ) { }


  async create(createProductDto: CreateProductDto) {
    const newEntity = this.classMapper.map(createProductDto, CreateProductDto, Product)
    return this.classMapper.mapAsync(await this.productRepository.save(newEntity), Product, CreateProductDto)
  }

  async findAll() {
    return this.classMapper.mapArrayAsync(await this.productRepository.find(), Product, CreateProductDto);
  }

  async findOne(id: number) {

    return this.classMapper.map(await this.productRepository.findOneBy({ productId: id }), Product, CreateProductDto)

  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const obj = await this.productRepository.findOneBy({ productId: id })
    if (obj != null) {
      const product = this.classMapper.map(updateProductDto, UpdateProductDto, Product)
      console.log(product)
      return this.classMapper.map(await this.productRepository.save(product), Product, UpdateProductDto)
    }


    else
      throw new HttpException('This Item deos not exits', HttpStatus.NOT_FOUND)
  }

  async remove(id: number) {
    const obj = await this.productRepository.findOneBy({ productId: id })
    if (obj === null)
      throw new HttpException('No record Found', HttpStatus.NOT_FOUND)
    this.productRepository.delete({ productId: id })

  }

  async paginate(options: IPaginationOptions, orderProperty: string, orderDirection: SortOrder): Promise<Pagination<Product>> {

    const queryBuilder = this.productRepository.createQueryBuilder('c')
    queryBuilder.orderBy(orderProperty, orderDirection)
    return paginate<Product>(queryBuilder, options)

  }

  async filtering(filter?: Filtering) {

    const where = getWhere(filter);
    const queryBuilder = this.productRepository.find({ where })
    return queryBuilder;


  }

  getUserPrducts(userId: string) {
    console.log(userId)
    return this.productRepository.findBy({ userId: userId })
  }

}




