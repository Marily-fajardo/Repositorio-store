import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "../dto/category.dto";
import { Category } from '../entities/category.entity';



@Injectable()
export class CategoriesService{
    constructor(
        @InjectRepository(Category)
        private categoryRepo: Repository<Category>
    ){}

    async create(createCategoryDto:CreateCategoryDto){
        const category = this.categoryRepo.create(createCategoryDto);
        await  this.categoryRepo.save(category);
        return category;
    }

    //Encontrar un modelo
    // findOne(id: number){
    //     return this.modeloRepo.findOneBy({id})
    // }

    findOne(id: number){
         return this.categoryRepo.findOne({
             where: {id},
             relations: {
                autor: true,
             }
        
         });
    }
    //mostrar todas las catgeorias
    findAll(){
        return   this.categoryRepo.find({
            order: {id: 'ASC'},
        });
    }

    //eliminar una categoria
    async remove(id:number){
        const category =await this.findOne(id);
        await this.categoryRepo.remove(category);
        return 'categoria eliminada';
    }

    //actualizar un categoria
    async update(id: number, cambios: CreateCategoryDto){
        const oldCategory = await this.findOne(id);
        const updateCategory = await this.categoryRepo.merge(oldCategory,cambios);
        return this.categoryRepo.save(updateCategory);
    }
    
}