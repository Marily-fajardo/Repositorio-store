import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user.dto';
import { UserImage } from '../entities/user-image.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(UserImage)
    private readonly userImageRepo: Repository<UserImage>,

    private readonly dataSource: DataSource,
  ) {}

  async create(userDto: CreateUserDto){
    const { images = [], ...detailsUser } = userDto;

    const user = await this.userRepo.create({
      ...detailsUser,
      images: images.map((image) => 
      this.userImageRepo.create({ url: image }),
      ),
    });

    await this.userRepo.save(user);
    return user;

  }

  //encotrar un producto
  findOne(id: number){
    return this.userRepo.findOne({
        where: {id},
        relations: {
           autor: true,
      
        },
   
    });
}
  //mostrar todos los registros
  findAll(){
    return   this.userRepo.find({
        order: {id: 'ASC'},
        relations: {
            images: true,
        },
    });
}


//eliminar un registro
  async remove(id: number) {
  const user = await this.findOne(id);
  await this.userRepo.remove(user);
  return ' usuario eliminado satisfactoriamente' ;
  }

 //Actualizar un producto con imagenes
 async update(id: number, cambios: CreateUserDto){
  const {images, ...updateAll } = cambios;
  const user = await this.userRepo.preload({
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
      await queryRunner.manager.delete(UserImage, {product: { id }});
      
      //creamos nuevas imagenes
      user.images = images.map((image) =>
      this.userImageRepo.create({ url: image }),
      );
  } else {
      user.images = await this.userImageRepo.findBy({ user: { id }});
  }
  //guardamos el producto
  await queryRunner.manager.save(user);

  //finalizamos la transaccion y liberamos el queryRunner
  await queryRunner.commitTransaction();
  await queryRunner.release();
  return user;
}
}
