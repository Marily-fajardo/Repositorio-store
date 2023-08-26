import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

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

  @Column({ type: 'varchar', nullable: true })
  filename: string;
  
  @Column({ type: 'varchar', nullable: true })
  categoria_id: number;
  
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at:Date;

  
  @ManyToOne(() => Category)
  @JoinColumn({ 
    name: 'categoria_id' 
  })
  categoria: Category;


  @ManyToOne(()=> User)
  @JoinColumn({
    name: 'user_id', 
    referencedColumnName: 'id'
   })
   autor: User;
}
