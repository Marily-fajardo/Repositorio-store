import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
  export class Category {
    @PrimaryGeneratedColumn({ type: 'int4' })
    id?: number;
  
    @Column({ type: 'varchar',  nullable: false })
    categoria: string;

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    created_at:Date;

    @Column({ type: 'int4', nullable: false })
    user_id: number;


    @ManyToOne(()=> User)
    @JoinColumn({
      name: 'user_id', //el campo que relaciona a mi tabla
      referencedColumnName: 'id' //este es el id del usuario
  
    })
    autor: User;

  }