import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modelos } from './entities/modelos.entity';
import { MarcasService } from './services/marcas.service';
import { Marca } from './entities/marca.entity';
import { ModelosService } from './services/modelos.service';
import { MarcaController } from './controllers/marcas.controller';
import { ModelosController } from './controllers/modelos.controller';



@Module({
  imports: [TypeOrmModule.forFeature([Marca, Modelos])],
  controllers: [MarcaController, ModelosController],
  providers: [MarcasService, ModelosService],
})
export class MarcasModule {}
