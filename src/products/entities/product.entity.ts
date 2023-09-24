import { type } from 'os';
import { timestamp } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Category } from './category.entity';
import { Proveedor } from './proveedor.entity';
import { ProductImage } from './product-image.entity';
  
  
  @Entity()
  export class Product {
    @PrimaryGeneratedColumn({ type: 'int4' })
    id?: number;
  
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;
  
    @Column({ type: 'varchar', length: 300, nullable: false })
    description: string;
  
    @Column({ type: 'int4', nullable: false })
    price: number;
  
    @Column({ type: 'int8', nullable: false })
    stock: number;

    @Column({ type: 'int4', nullable: false })
    user_id: number;
    
    //@Column ({type:'varchar',nullable:true})
    //filename:string;

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    created_at:Date;

    @Column({ type: 'int4', nullable: false })
    category_id: number;

    //relaciones

    @ManyToOne(()=> User)
    @JoinColumn({
      name: 'user_id', //el campo que relaciona a mi tabla
      referencedColumnName: 'id' //este es el id del usuario
  
    })
    autor: User;

    @ManyToOne(()=> Category)
  @JoinColumn({
   name: 'category_id', // campo que relaciona a mi tabla
   referencedColumnName: 'id' //este es el id de la categoria

  })
  Category: Category;

  @ManyToOne(()=> Proveedor)
  @JoinColumn({
   name: 'proveedor_id', // campo que relaciona a mi tabla
   referencedColumnName: 'id' //este es el id del proveedor

  })
  Proveedor: Proveedor;

//Un producto puede tener muchas imagenes
@OneToMany(() => ProductImage, (productImage) => productImage.product, {
  cascade: true,
})
images?: ProductImage[];
}