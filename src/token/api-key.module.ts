import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApikeyRepository } from './repository/api-key.repository';
import { ApiKeyService } from './api-key.service';
import { UserService } from 'src/users/users.service';
import { UserRepository } from 'src/users/repository/user.reopsitory';
import { ApiKeyController } from './api-key.controller';

const repo = [ApikeyRepository, UserRepository];
@Module({
  imports: [TypeOrmModule.forFeature([ApikeyRepository, UserRepository])],
  controllers: [ApiKeyController],
  providers: [...repo, ApiKeyService, UserService],
  exports: [ApikeyRepository],
})
export class ApiKeyModule {}
