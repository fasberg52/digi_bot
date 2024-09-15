import { BaseEntity } from '../../shared/entity/base-entity';
import { UserEntity } from '../../users/entity/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Generated,
  Relation,
} from 'typeorm';

@Entity('api_keys')
export class ApiKeyEntity extends BaseEntity {
  @Column()
  @Generated('uuid')
  apiKey: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => UserEntity, (user) => user.apiKeys)
  user: Relation<UserEntity>;
}
