import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Relation,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TransactionStatus } from '../enums/transaction.enum';
import { ApiProperty } from '@nestjs/swagger';
import { SubscribeEntity } from '../../subscribe/entity/subscribe.entity';
import { UserEntity } from '../../users/entity/users.entity';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

@Entity('transactions')
export class TransactionEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'int' })
  @IsNumber()
  @IsNotEmpty()
  @Min(100)
  amount: number;

  @ApiProperty()
  @Column({ type: 'int', nullable: true })
  @IsNumber()
  @IsOptional()
  refId: number;

  @ApiProperty({ enum: TransactionStatus })
  @Column({ type: 'enum', enum: TransactionStatus })
  @IsEnum(TransactionStatus)
  @IsNotEmpty()
  status: TransactionStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  @IsDateString()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @IsDateString()
  @IsOptional()
  updatedAt: Date;

  @ApiProperty()
  @Column({ type: 'int' })
  @IsNumber()
  userId: number;

  @ApiProperty()
  @Column({ type: 'int' })
  @IsNumber()
  subscribeId: number;

  @ManyToOne(() => SubscribeEntity, (subscribe) => subscribe.transactions)
  @JoinColumn({ name: 'subscribeId', referencedColumnName: 'id' })
  @ApiProperty({ type: () => SubscribeEntity })
  subscribe: Relation<SubscribeEntity>;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ApiProperty({ type: () => UserEntity })
  user: Relation<UserEntity>;
}
