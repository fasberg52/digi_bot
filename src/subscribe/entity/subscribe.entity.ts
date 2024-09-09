import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseEntity } from 'src/shared/entity/base-entity';
import { Column, DeleteDateColumn, Entity, OneToMany, Relation } from 'typeorm';
import { SubscriptionStatusEnum } from '../enums/subscribe.entity';
import { SubscribeUserEntity } from './subscribe-user.entity';

@Entity({ name: 'subscribe' })
export class SubscribeEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @Column({ type: 'int' })
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Column({ type: 'int', nullable: true })
  discount: number;

  @ApiProperty()
  @Column({ type: 'timestamptz', nullable: true })
  @IsDateString()
  @IsOptional()
  start: Date;

  @ApiProperty()
  @Column({ type: 'timestamptz', nullable: true })
  @IsDateString()
  @IsOptional()
  end: Date;

  @Column({ type: 'int', nullable: false })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  validityDuration: number;

  @ApiProperty({ enum: SubscriptionStatusEnum })
  @Column({
    type: 'enum',
    enum: SubscriptionStatusEnum,
    nullable: false,
    default: SubscriptionStatusEnum.ACTIVE,
  })
  @IsEnum(SubscriptionStatusEnum)
  status: SubscriptionStatusEnum;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @IsDateString()
  @IsOptional()
  deletedAt: Date;

  @OneToMany(
    () => SubscribeUserEntity,
    (userToSubscriptions) => userToSubscriptions.subscribe,
  )
  userToSubscriptions: Relation<SubscribeUserEntity[]>;
}
