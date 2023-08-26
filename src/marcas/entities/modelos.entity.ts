import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Marca } from './marca.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Modelos {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id?: number;

  @Column({ type: 'int8',  nullable: false })
  marca_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'int8', nullable: false })
  user_id: number;

  @ManyToOne(()=> User)
  @JoinColumn({
    name: 'user_id', 
    referencedColumnName: 'id'
  })
  autor: User;

  @ManyToOne(()=> Marca)
  @JoinColumn({
   name: 'marca_id', 
   referencedColumnName: 'id' 
  })
  marca: Marca;

  
}