
import { IsBooleanString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class product {

    @PrimaryGeneratedColumn({type:"int4"}) 
    id: number;

    @Column({type:"varchar",length:100,nullable:false})
    name: string;

    @Column({type:"varchar",length:100,nullable:false})
    description: string;

    @Column()
    price: string;

    @Column()
    stock: string;

    
    
        



}