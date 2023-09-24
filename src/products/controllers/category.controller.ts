import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateCategoryDto } from "../dto/category.dto";
import { CategoriesService } from "../services/category.service";



@Controller('category')
export class CategoryController
{
    constructor(private readonly categoriesService:CategoriesService){}
    @Post()
    async CreateCategory(@Body() createCategoryDto: CreateCategoryDto){
        return this.categoriesService.create(createCategoryDto);
    }

    
    @Get()
    findAll(){
        return this.categoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number){
        return this.categoriesService.findOne(id);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe)id: number){
        return this.categoriesService.remove(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)id: number,
        @Body()createCategoryDto :CreateCategoryDto,
        
    )
    
    {
        return this.categoriesService.update(id, createCategoryDto)
    }
}