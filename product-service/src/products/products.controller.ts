/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, DefaultValuePipe, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import {  Sorting } from './sort.decorator';
import { Filtering, FilteringParams, Filteringobj } from './entities/filter.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { HasRoles } from 'src/auth/has-role.decorator';
import { Role } from 'src/models/role.enum';
import { SkipAuth } from 'src/auth/skip-auth.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @HasRoles(Role.User)
  create(@Request() req: any, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(req.user.userId, createProductDto);
  }

  // @Get()
  // findAll() {
  //   return this.productsService.findAll();
  // }

  @SkipAuth()
  @Get('listAll')
  @ApiBearerAuth()
  // @UseGuards(RolesGuard)
  // @HasRoles(Role.User)
  @ApiOperation({ summary: 'List all product, paginated and sorted descinding regarding the price' })
  // @ApiQuery({ name: 'sort.propertye', required: false, enum: SortingOption })
  // @ApiQuery({ name: 'sort.direction', required: false, enum: SortOrder })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async browse(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe,) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    // @Query('sort.propertye') sortProperty: SortingOption = SortingOption.price,
    // @Query('sort.direction') sortDirection: SortOrder = SortOrder.DESC,
    // @SortingParams(['price', 'productName']) sort: Sorting, 
    @Query() sorting: Sorting
  ): Promise<Pagination<Product>> {
console.log(sorting)
    limit = limit > 100 ? 100 : limit;
    return this.productsService.paginate({
      page,
      limit,
    }, sorting
    );

  }


  @Get('filter')
  @ApiQuery({ name: 'filter', description: 'Formate(property:operator:value)', type: String, example: 'product_name:eq:xyz' })
  async browseByFilter(
    @FilteringParams(['price', 'productName']) filter?: Filtering
  ) {
    return this.productsService.filtering(
      filter);
  }

  @Get('user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'list all products of an specidic , user determinded by the jwt token' })
  @UseGuards(RolesGuard)
  @HasRoles(Role.User)
  getUserProducts(@Request() req: any) {
    console.log(req.user.sub)
    return this.productsService.getUserPrducts(req.user.userId)
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Query() filter: Filteringobj, @Param('id') id: number) {
    console.log(filter)
    if (id == null)
      throw new HttpException('Missing id', HttpStatus.BAD_REQUEST);
    const result = this.productsService.findOne(id);
    console.log(result)
    if (result !== undefined)
      return this.productsService.findOne(id);
    else throw new HttpException('There is no result', HttpStatus.OK)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an product, providing its id' })
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    console.log(updateProductDto)
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}


