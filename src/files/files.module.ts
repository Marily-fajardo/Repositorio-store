import { Module } from '@nestjs/common';
import { FilesService } from './services/files.service';
import { FilesController } from './controllers/files.controllers';
@Module({
    controllers: [FilesController],
    providers: [FilesService]
})
export class FilesModule { }
