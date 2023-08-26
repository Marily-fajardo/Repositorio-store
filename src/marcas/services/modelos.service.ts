import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModelosDto } from '../dto/modelos.dto';
import { Modelos } from '../entities/modelos.entity';
@Injectable()
export class ModelosService{
    constructor(
        @InjectRepository(Modelos)
        private modelosRepo: Repository<Modelos>
    ){}

    async create(createModelosDto:CreateModelosDto){
        const marca = this.modelosRepo.create(createModelosDto);
        await  this.modelosRepo.save(marca);
        return marca;
    }

    //Encontrar una modelo
    
    findOne(id: number){
        return this.modelosRepo.findOne({
            where: {id},
            relations: {
               marca: true,
               autor: true,
            }
       
        });
   }
    //mostrar todas las modelos
    findAll(){
        return   this.modelosRepo.find({
            order: {id: 'ASC'},
        });
    }

    //eliminar un modelo
    async remove(id:number){
        const modelos =await this.findOne(id);
        await this.modelosRepo.remove(modelos);
        return 'Modelo eliminado';
    }

    //actualizar una marca
    async update(id: number, cambios: CreateModelosDto){
        const oldModelos = await this.findOne(id);
        const updateModelos = await this.modelosRepo.merge(oldModelos, cambios);
        return this.modelosRepo.save(updateModelos);
    }
}