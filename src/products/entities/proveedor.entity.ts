import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';

@Entity()
export class Proveedor{

    @PrimaryGeneratedColumn({type:'int4'})
    id?: number;
    

    @Column({type: 'varchar', length:80, nullable: false})
    proveedor:string;
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at:Date;
  
  @Column({ type: 'int4', nullable: false })
  user_id: number;
    
   //Relaciones
   @ManyToOne(()=>User )
   @JoinColumn({
       name: 'user_id',//el campo que relaciona a mi tabla
       referencedColumnName: 'id',// este es el id del usuario

   })
   autor: User;


}