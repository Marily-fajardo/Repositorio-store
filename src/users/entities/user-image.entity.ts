import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";



@Entity()
export class UserImage {
@PrimaryGeneratedColumn({ type: "int4" })
id: number;

@Column({type:'varchar',nullable:true})
url:string;


//:TODO:Escribir una relacion que se llamara product

@ManyToOne(() => User, (user) => user.images, {
    onDelete: 'CASCADE',
})

user: User;

}