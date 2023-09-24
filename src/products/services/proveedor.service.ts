import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Proveedor } from "../entities/proveedor.entity";
import { Repository } from "typeorm";
import { CreateProveedorDto } from "../dto/proveedor.dto";


@Injectable()
export class ProveedoresService{
    constructor(
        @InjectRepository(Proveedor)
        private proveedorRepo: Repository<Proveedor>
    ){}

    async create(createProveedorDto:CreateProveedorDto){
        const proveedor = this.proveedorRepo.create(createProveedorDto);
        await  this.proveedorRepo.save(proveedor);
        return proveedor;
    }

    //Encontrar un modelo
    // findOne(id: number){
    //     return this.modeloRepo.findOneBy({id})
    // }

    findOne(id: number){
         return this.proveedorRepo.findOne({
             where: {id},
             relations: {
                autor: true,
             }
        
         });
    }
    //mostrar todas las catgeorias
    findAll(){
        return   this.proveedorRepo.find({
            order: {id: 'ASC'},
        });
    }

    //eliminar una categoria
    async remove(id:number){
        const proveedor =await this.findOne(id);
        await this.proveedorRepo.remove(proveedor);
        return 'categoria eliminada';
    }

    //actualizar un categoria
    async update(id: number, cambios: CreateProveedorDto){
        const oldProveedor = await this.findOne(id);
        const updateProveedor = await this.proveedorRepo.merge(oldProveedor,cambios);
        return this.proveedorRepo.save(updateProveedor);
    }
    
}