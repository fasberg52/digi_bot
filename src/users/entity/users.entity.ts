import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { SessionEntity } from 'src/session/entity/sessios.entity';
import { BaseEntity } from 'src/shared/entity/base-entity';
import { RoleEnum } from 'src/shared/enum/role.enum';
import { SubscribeUserEntity } from 'src/subscribe/entity/subscribe-user.entity';
import { Column, Entity, JoinColumn, OneToMany, Relation } from 'typeorm';

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
  userToSubscriptions: Relation<SubscribeUserEntity[]>;
}
