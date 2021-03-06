import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Subsidiary from './Subsidiary';

@Entity('departaments')
class Departament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  initials: string;

  @Column()
  subsidiary_id: string;

  @ManyToOne(() => Subsidiary)
  @JoinColumn({ name: 'subsidiary_id' })
  subsidiary: Subsidiary;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  goal: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Departament;
