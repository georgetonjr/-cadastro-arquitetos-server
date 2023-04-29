import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'customer' })
export class CustomerEntity {
  @PrimaryColumn({ 
    type: 'varchar', 
    nullable: false, 
  })
    id: string;

  @Column({ type: 'varchar' })
    name: string;

  @Column({ unique: true })
    email: string;

  @Column({ type: 'varchar' })
    phone: string;

  @Column({ type: 'varchar' })
    gender: string;

  @Column({ type: 'int' })
    age: number;
  
  @Column({ nullable: false })
    password: string;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
