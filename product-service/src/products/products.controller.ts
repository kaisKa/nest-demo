/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, DefaultValuePipe, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, SortingOption } from './entities/product.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SortOrder } from './sort.decorator';
import { Filtering, FilteringParams } from './entities/filter.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { HasRoles } from 'src/auth/has-role.decorator';
import { Role } from 'src/models/role.enum';

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
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @HasRoles(Role.User)
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


  @Get('filter')
  @ApiQuery({ name: 'filter', description: 'Formate(property:operator:value)', type: String, example: 'product_name:eq:xyz' })
  async browseByFilter(
    @FilteringParams(['price', 'productName']) filter?: Filtering
  ) {
    return this.productsService.filtering(
      filter);
  }

  @Get('user/:userId')
  @ApiParam({ name: 'userId', type: String, required: false })
  @ApiBearerAuth()
  @HasRoles(Role.User)
  getUserProducts(@Request() req: any) {
    console.log(req.user.sub)
    return this.productsService.getUserPrducts(req.user.userId)
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


