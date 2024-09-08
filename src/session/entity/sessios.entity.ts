import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entity/users.entity';
import { BaseEntity } from 'src/shared/entity/base-entity';

@Entity('sessions')
export class SessionEntity extends BaseEntity {
  @Column({ type: 'bigint', nullable: false })
  @ApiProperty()
  userId: number;

  @Column({ type: 'json', nullable: false, default: [] })
  @ApiProperty()
  device: object;

  @Column({ type: 'text', nullable: false })
  @ApiProperty()
  token: string;

  @Column({ type: 'date', nullable: false })
  @ApiProperty()
  expiredTime: Date;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  @JoinColumn()
  @ApiProperty({ type: () => UserEntity })
  user: Relation<UserEntity>;
}
