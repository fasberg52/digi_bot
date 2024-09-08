import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entity/users.entity';

export class CreateUserDto extends PickType(UserEntity, [
  'firstName',
  'lastName',
  'email',
  'password',
  'phone',
]) {}
