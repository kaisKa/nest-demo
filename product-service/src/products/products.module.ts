/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from './products.providers';
import { ProductMapper } from './dto/mapper.profile';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductMapper,ProductsService,...productProviders],

})
export class ProductsModule {}
