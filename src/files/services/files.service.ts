import { BadRequestException, Injectable, Patch } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
    constructor(){}
     
    getStaticImageName(imageName: string){
        const path =join(__dirname, '../../../ static/products', imageName);
        
        // si existe la imagen 
        if (!existsSync(path)){
            throw new BadRequestException(
                ` No existe el producto de la imagen ${imageName}`,
            );
        }
        return path;
    }

     getStaticImageNameU(imageName: string){
        const path =join(__dirname, '../../../ static/user', imageName);
        
        // si existe la imagen 
        if (!existsSync(path)){
            throw new BadRequestException(
                ` No existe el producto de la imagen ${imageName}`,
            );
        }
        return path;
    }

}