import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { SubscribeEntity } from './subscribe.entity';
import { UserEntity } from 'src/users/entity/users.entity';
import { BaseEntity } from 'src/shared/entity/base-entity';

@Entity({ name: 'user_subscription' })
@ApiExtraModels()
export class SubscribeUserEntity extends BaseEntity {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Column()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Column()
  subscriptionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  expiresAt: Date;

  @ApiProperty({
    type: () => SubscribeEntity,
  })
  @ManyToOne(
    () => SubscribeEntity,
    (subscribe) => subscribe.userToSubscriptions,
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'subscriptionId' })
  subscribe: Relation<SubscribeEntity>;

  @ApiProperty({
    type: () => UserEntity,
  })
  @ManyToOne(() => UserEntity, (user) => user.userToSubscriptions)
  @JoinColumn({ referencedColumnName: 'id', name: 'userId' })
  user: Relation<UserEntity>;
}
