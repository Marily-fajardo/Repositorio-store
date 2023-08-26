import { Controller, Post, Body, Param, ParseIntPipe, Get, Delete, Patch } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/product.dto';
import { get } from 'http';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsServices: ProductsService) {}

  @Post()
  async create(@Body() productDto: CreateProductDto) {
    return await this.productsServices.create(productDto);
  }

  @Get()
  findAll() {
    return this.productsServices.findAll();

  }

  @Get(':id')
  finOne(@Param('id', ParseIntPipe) id: number){
    return this.productsServices.finOne(id);

  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsServices.remove(id);
  }

  //el metodo patch actualiza parcialmente
  //los pipes son transformadores, transforman la data
  @Patch('id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() CreateProductDto: CreateProductDto,
  ) {
    return this.productsServices.update(id, CreateProductDto);
  }
}
