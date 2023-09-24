import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/product.service';
import { ProductImage } from './entities/product-image.entity';
import { Category } from './entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoriesService } from './services/category.service';
import { Proveedor } from './entities/proveedor.entity';
import { ProveedorController } from './controllers/proveedor.controller';
import { ProveedoresService } from './services/proveedor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product,ProductImage,Category, Proveedor])],
  controllers: [ProductsController, CategoryController, ProveedorController],
  providers: [ProductsService,CategoriesService, ProveedoresService],
})
export class ProductsModule {}