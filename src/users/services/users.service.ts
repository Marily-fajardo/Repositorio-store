import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}
//crear un registro
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    await this.userRepo.save(user);

    return user;
  }

  //encotrar un producto
  finOne(id: number){
    return this.userRepo.findOneBy({ id });
  }

  //mostrar todos los registros
  findAll(){
    return this.userRepo.find({
      order: { id: 'ASC'},
    });
  }


//eliminar un registro
  async remove(id: number) {
  const user = await this.finOne(id);
  await this.userRepo.remove(user);
  return ' producto eliminado satisfactoriamente' ;
  }

  //actualizar un producto
  async update(id: number, cambios: CreateUserDto) {
    const olduser = await this.finOne(id);
    const updateuser = await this.userRepo.merge(olduser, cambios);
    return this.userRepo.save(updateuser);
  }
}
