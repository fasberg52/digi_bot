import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entity/users.entity';
import { UserRepository } from './repository/user.reopsitory';
import { CreateUserDto, DigikalaTokenDto, UpdateUserDto } from './dto';
import { getAllQuery } from '/srcshared/dto/query.dto';
import { FindOptionsOrder, FindOptionsWhere, Like } from 'typeorm';
import { DigikalaTokenRepository } from './repository/digikala-token.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly digikalaTokenRepository: DigikalaTokenRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findOneUser(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneUser(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneUserByTelegram(telegramId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneUserByTelegram(telegramId);
    if (!user) {
      throw new NotFoundException(
        `User with Telegram ID ${telegramId} not found`,
      );
    }
    return user;
  }

  async getAllUsers(query: getAllQuery): Promise<[UserEntity[], number]> {
    const { id, search, sortBy, sortOrder, page = 1, limit = 10 } = query;

    const where: FindOptionsWhere<UserEntity> = {};

    if (id) {
      where.id = id;
    }

    if (search) {
      where.firstName = Like(`%${search}%`);
    }

    const order: FindOptionsOrder<UserEntity> = {};

    if (sortBy) {
      order[sortBy] = sortOrder;
    }

    const [users, total] = await this.userRepository.findAndCount({
      where,
      order,
      skip: (page - 1) * limit,
      take: limit,
    });

    return [users, total];
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async softDeleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.deletedAt = new Date();
    await this.userRepository.save(user);
  }

  async restoreUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user || !user.deletedAt) {
      throw new NotFoundException(
        `User with ID ${userId} not found or not deleted`,
      );
    }

    user.deletedAt = null;
    await this.userRepository.save(user);
  }

  async addTokenDigikala(token: DigikalaTokenDto, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const newDigikalaToken = await this.digikalaTokenRepository.create({
      digikalaToken: token.digikalaToken,
      userId,
    });

    return await this.digikalaTokenRepository.save(newDigikalaToken);
  }
}
