import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { UpdateApiKeyDto } from './dto/update-api.dto';
import { CreateApiKeyDto } from './dto/create-api.dto';
import { ApiKeyEntity } from './entity/api-key.entity';
import { UserService } from 'src/users/users.service';
import { ApikeyRepository } from './repository/api-key.repository';

@Injectable()
export class ApiKeyService {
  constructor(
    private readonly _apiKeyRepository: ApikeyRepository,
    private readonly _userService: UserService,
  ) {}

  async createApikey(createApiKeyDto: CreateApiKeyDto) {
    const user = await this._userService.findOneUser(createApiKeyDto.userId);
    if (!user) {
      throw new NotFoundException('کاربر پیدا نشد');
    }

    await this._apiKeyRepository.createApikey({
      user,
    });
  }
  async checkApikey(apikey: string) {
    const apiKey = await this.getByApiKey(apikey);
    if (!apiKey) {
      throw new NotFoundException('کلید نامعتبر');
    }

    return apiKey;
  }

  findAll() {
    return this._apiKeyRepository.find();
  }

  getByApiKey(apiKey: string) {
    return this._apiKeyRepository.findOneBy({
      apiKey: Equal(apiKey),
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} apiKey`;
  }

  update(id: number, updateApiKeyDto: UpdateApiKeyDto) {
    return `This action updates a #${id} apiKey`;
  }

  remove(id: number) {
    return `This action removes a #${id} apiKey`;
  }
}
