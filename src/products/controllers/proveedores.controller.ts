import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, } from '@nestjs/common';
import { AppController } from '../../app.controller';

import { Proveedoresservice } from '../services/proveedores.service';
import { createProveedordto } from '../dto/proveedor.dto';

@Controller('proveedores')
export class proveedoresController
{
   
    constructor(private readonly proveedoresservice:Proveedoresservice){}
        @Post()
        async CreateProveedores(@Body() createProveedordto: createProveedordto){
            return this.proveedoresservice.create(createProveedordto);
        }
    @Get()
    findAll(){
        return this.proveedoresservice.findAll();
    }
     
    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number){
        return this.proveedoresservice.findOne(id);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe)id: number){
        return this.proveedoresservice.remove(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)id: number,
        @Body()createProveedordto :createProveedordto,
        
    )
    {
        return this.proveedoresservice.update(id, createProveedordto)
    }
}
