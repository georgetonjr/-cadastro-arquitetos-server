import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArchitectEntity } from './architect-entity';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'order_service' })
export class OrderServiceEntity {
  @PrimaryColumn({ 
    type: 'varchar', 
    nullable: false, 
  })
    id: string;

  @Column({ 
    type: 'boolean', 
    default: true, 
  })
    isActive: boolean;
  
  @Column({ 
    type: 'varchar', 
    default: true,
  })
    show: boolean;
  
  @Column({ 
    type: 'varchar',
    array: true, 
    default: [],
  })
    rejectedBy: string[];

  @Column({ type: 'varchar' })
    title: string;

  @Column({ type: 'varchar' })
    description: string;

  @Column({ type: 'int' })
    price: number;

  @Column({ type: 'varchar' })
    status: string;

  @OneToOne(() => ArchitectEntity)
    architect?: ArchitectEntity;

  @OneToOne(() => CustomerEntity)
    customer: CustomerEntity;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
