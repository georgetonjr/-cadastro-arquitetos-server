import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArchitectEntity } from './architect-entity';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'order_service' })
export class OrderServiceEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    title: string;

  @Column()
    description: string;

  @Column()
    price: number;

  @Column()
    status: string;

  @OneToOne(() => ArchitectEntity)
    architect: ArchitectEntity;

  @OneToOne(() => CustomerEntity)
    customer: CustomerEntity;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
