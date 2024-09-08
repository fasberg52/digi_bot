import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/users/repository/user.reopsitory';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  imports: [TypeOrmModule.forFeature([UserRepository])],
})
export class AuthModule {}
