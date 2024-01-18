/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, SortingOption } from './entities/product.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SortOrder } from './sort.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('listAll')
  @ApiOperation({ summary: 'List all product, paginated and sorted descinding regarding the price' })
  @ApiQuery({ name: 'sort.propertye', required: false, enum: SortingOption })
  @ApiQuery({ name: 'sort.direction', required: false, enum: SortOrder })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async browse(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe,) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('sort.propertye') sortProperty: SortingOption = SortingOption.price,
    @Query('sort.direction') sortDirection: SortOrder = SortOrder.DESC,
    // @SortingParams(['price', 'productName']) sort: Sorting, 

  ): Promise<Pagination<Product>> {

    limit = limit > 100 ? 100 : limit;
    return this.productsService.paginate({
      page,
      limit,
    },
      sortProperty, sortDirection);

  }

  @Get('user/:userId')
  @ApiParam({name: 'userId',type: String})
  getUserProducts(userId:string){
    return this.productsService.getUserPrducts(userId)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    if (id == null)
      throw new HttpException('Missing id', HttpStatus.BAD_REQUEST);
    const result = this.productsService.findOne(id);
    console.log(result)
    if (result !== undefined)
      return this.productsService.findOne(id);
    else throw new HttpException('There is no result', HttpStatus.OK)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    console.log(updateProductDto)
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}


