import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product.dto';
import { ProductImage } from '../entities/product-image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,

    private readonly dataSource: DataSource,
  ) {}

  //Crear un registro
  //async create(createProductDto: CreateProductDto) {
  //  const product = this.productRepo.create(createProductDto);
  //  await this.productRepo.save(product);

  //  return product;
  //}

  //crear un producto y agregar una imagen
  async create(productDto: CreateProductDto){
    const { images = [], ...detailsProducts } = productDto;

    const product = await this.productRepo.create({
      ...detailsProducts,
      images: images.map((image) => 
      this.productImageRepo.create({ url: image }),
      ),
    });

    await this.productRepo.save(product);
    return product;

  }

  //Encontrar un registro
   //findOne(id: number) {
    //return this.productRepo.findOneBy({ id });
   //}

   findOne(id: number){
    return this.productRepo.findOne({
        where: {id},
        relations: {
           autor: true,
      
        }
   
    });
}



  //Mostrar todos los registros
  findAll(){
    return   this.productRepo.find({
        order: {id: 'ASC'},
        relations: {
            autor: true,
            Category: true,
            Proveedor: true,
            images: true,
        },
    });
}

  //Eliminar un registro
  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
    return 'Producto eliminado satisfactoriamente';
  }

  //Actualizar un producto
  //async update(id: number, cambios: CreateProductDto) {
   // const oldProduct = await this.findOne(id);
   // const updatedProduct = await this.productRepo.merge(oldProduct, cambios);
   // return this.productRepo.save(updatedProduct);
  //}

  //Actualizar un producto con imagenes
  async update(id: number, cambios: CreateProductDto){
    const {images, ...updateAll } = cambios;
    const product = await this.productRepo.preload({
        id: id,
        //Spread Operator(operador para esparcir)
        ...updateAll,//Esparcir todos los datos del producto
        

    
    });
    //correr el queryRunner

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    if(images) {
        //sino esta vacio borramos las imagenes existentes
        await queryRunner.manager.delete(ProductImage, {product: { id }});
        
        //creamos nuevas imagenes
        product.images = images.map((image) =>
        this.productImageRepo.create({ url: image }),
        );
    } else {
        product.images = await this.productImageRepo.findBy({ product: { id }});
    }
    //guardamos el producto
    await queryRunner.manager.save(product);

    //finalizamos la transaccion y liberamos el queryRunner
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return product;
}
}