import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { BaseEntity } from '/srcshared/entity/base-entity';
import { UserEntity } from './users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('digikala_tokens')
export class DigikalaTokenEntity extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  digikalaToken: string;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.digikalaTokens)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ApiProperty({ type: () => UserEntity })
  user: Relation<UserEntity>;
}
