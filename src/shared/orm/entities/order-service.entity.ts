import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
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

  @ManyToOne(() => ArchitectEntity)
  @JoinColumn({ name: 'architect_id' })
    architect?: Relation<ArchitectEntity>;

  @ManyToOne(() => CustomerEntity, (customer) => customer.id)
  @JoinColumn({ 
    name: 'customer_id', 
    foreignKeyConstraintName: 'customer_id', 
    referencedColumnName: 'id',
  })
    customer: Relation<CustomerEntity>;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
