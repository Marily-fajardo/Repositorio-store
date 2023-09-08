import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Get } from '@nestjs/common';
import { PdfFilesService } from '../services/pdfFiles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { pdfFilter } from 'src/helpers/filespdf.helper';
import { fileNamer } from 'src/helpers/fileNamer';
import { diskStorage } from 'multer';





@Controller('files-pdf')
export class pdfFilesController {
    constructor(private readonly FilesService: PdfFilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file',{

      fileFilter: pdfFilter,

      storage: diskStorage({
        destination: './static/pdf/',
        filename: fileNamer,
      }),

    })
    )
    UploadedFile(@UploadedFile() file: Express.Multer.File){
      if (!file){
        throw new BadRequestException ('Asegurarse que el archivo es una imagen');

      }
      return{
        fileNamer: file.filename,

      };

      }
      
   

}