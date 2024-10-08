import { Exclude } from 'class-transformer';
import { IsDateString, IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @IsNumber()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  @IsDateString()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @IsDateString()
  @Exclude()
  updatedAt: Date;
}
