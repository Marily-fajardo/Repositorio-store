import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ProveedoresService } from "../services/proveedor.service";
import { CreateProveedorDto } from "../dto/proveedor.dto";


@Controller('proveedor')
export class ProveedorController
{
    constructor(private readonly proveedoresService:ProveedoresService){}
    @Post()
    async CreateProveedor(@Body() createProveedorDto: CreateProveedorDto){
        return this.proveedoresService.create(createProveedorDto);
    }

    
    @Get()
    findAll(){
        return this.proveedoresService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number){
        return this.proveedoresService.findOne(id);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe)id: number){
        return this.proveedoresService.remove(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)id: number,
        @Body()createProveedorDto :CreateProveedorDto,
        
    )
    
    {
        return this.proveedoresService.update(id, createProveedorDto)
    }
}