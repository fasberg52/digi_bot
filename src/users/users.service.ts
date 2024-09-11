import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entity/users.entity';
import { UserRepository } from './repository/user.reopsitory';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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

  // Update a user
  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Update the user with new values
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  // Soft delete a user
  async softDeleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Set the `deletedAt` field to the current date
    user.deletedAt = new Date();
    await this.userRepository.save(user);
  }

  // Restore a soft-deleted user
  async restoreUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user || !user.deletedAt) {
      throw new NotFoundException(
        `User with ID ${userId} not found or not deleted`,
      );
    }

    // Clear the `deletedAt` field to restore the user
    user.deletedAt = null;
    await this.userRepository.save(user);
  }
}
