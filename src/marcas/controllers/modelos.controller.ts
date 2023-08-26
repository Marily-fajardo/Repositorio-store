import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

import { CreateModelosDto } from "../dto/modelos.dto";
import { ModelosService } from "../services/modelos.service";


@Controller('modelos')
export class ModelosController
{
    constructor(private readonly modelosService:ModelosService){}
    @Post()
    async CreateModelos(@Body() createModelosDto: CreateModelosDto){
        return this.modelosService.create(createModelosDto);
    }

    
    @Get()
    findAll(){
        return this.modelosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number){
        return this.modelosService.findOne(id);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe)id: number){
        return this.modelosService.remove(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)id: number,
        @Body()createModelosDto :CreateModelosDto,
        
    )
    {
        return this.modelosService.update(id, createModelosDto)
    }
}