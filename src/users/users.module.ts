import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.reopsitory';
import { UsersController } from './users.controller';
import { DigikalaTokenRepository } from './repository/digikala-token.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, DigikalaTokenRepository]),
  ],
  controllers: [UsersController],
  providers: [UserService, UserRepository, DigikalaTokenRepository],

  exports: [UserRepository, DigikalaTokenRepository],
})
export class UserModule {}
