import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pdfFilesController } from './controller/pdfFiles.contoller';
import { PdfFilesService } from './services/pdfFiles.service';



@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [pdfFilesController],
  providers: [PdfFilesService],
})
export class FilesPdfModule {}