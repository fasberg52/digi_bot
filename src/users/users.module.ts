import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.reopsitory';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [],
  providers: [UserService, UserRepository],

  exports: [UserRepository],
})
export class UserModule {}
