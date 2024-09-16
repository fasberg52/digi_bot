import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApikeyRepository } from './repository/api-key.repository';
import { ApiKeyService } from './api-key.service';
import { UserService } from '../users/users.service';
import { UserRepository } from '../users/repository/user.reopsitory';
import { ApiKeyController } from './api-key.controller';
import { DigikalaTokenRepository } from '/srcusers/repository/digikala-token.repository';

const repo = [ApikeyRepository, UserRepository, DigikalaTokenRepository];
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApikeyRepository,
      UserRepository,
      DigikalaTokenRepository,
    ]),
  ],
  controllers: [ApiKeyController],
  providers: [...repo, ApiKeyService, UserService],
  exports: [ApikeyRepository],
})
export class ApiKeyModule {}
