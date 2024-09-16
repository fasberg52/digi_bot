import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { SessionEntity } from '../../session/entity/session.entity';
import { BaseEntity } from '../../shared/entity/base-entity';
import { RoleEnum } from '../../shared/enum/role.enum';
import { SubscribeUserEntity } from '../../user-subscribe/entity/subscribe-user.entity';
import { TransactionEntity } from '../../transaction/entity/transaction.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  Relation,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiKeyEntity } from '../../token/entity/api-key.entity';
import { DigikalaTokenEntity } from './digikala-token.users.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column({ type: 'varchar' })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  email: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  password: string;

  @Column({ type: 'varchar' })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  phone: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  telegramId: number;

  @Column({ type: 'varchar', nullable: true })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  userName: string;

  @Column({ type: 'enum', enum: RoleEnum, default: 'user' })
  @ApiProperty({ enum: RoleEnum, example: [RoleEnum.USER, RoleEnum.ADMIN] })
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @OneToMany(() => SessionEntity, (session) => session.user)
  @JoinColumn()
  @ApiProperty({ type: () => [SessionEntity] })
  sessions: SessionEntity[];

  @OneToMany(
    () => SubscribeUserEntity,
    (userToSubscriptions) => userToSubscriptions.user,
  )
  @ApiProperty({ type: () => [SubscribeUserEntity] })
  userToSubscriptions: Relation<SubscribeUserEntity[]>;

  @OneToMany(() => TransactionEntity, (transactions) => transactions.user)
  @JoinColumn()
  @ApiProperty({ type: () => [TransactionEntity] })
  transactions: TransactionEntity[];

  @OneToMany(() => ApiKeyEntity, (apiKeys) => apiKeys.user)
  @JoinColumn()
  @ApiProperty({ type: () => [ApiKeyEntity] })
  apiKeys: Relation<ApiKeyEntity[]>;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @IsDateString()
  @Exclude()
  deletedAt: Date;

  @OneToMany(() => DigikalaTokenEntity, (digikalaTokens) => digikalaTokens.user)
  @JoinColumn()
  @ApiProperty({ type: () => [DigikalaTokenEntity] })
  digikalaTokens: DigikalaTokenEntity[];
}
