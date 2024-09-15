import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/repository/user.reopsitory';
import { loginTelegramDto, TelegramProfileDto } from './dto/login-telegram.dto';
import { UserEntity } from '../users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async loginTelegram(profile: TelegramProfileDto) {
    const {
      id: telegramId,
      username,
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
    } = profile;

    let user = await this.userRepository.findOneUserByTelegram(profile.id);

    if (!user) {
      const newUser = new UserEntity();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.phone = phone;
      newUser.telegramId = telegramId;
      newUser.userName = username;

      user = await this.userRepository.createUser(newUser);
    } else {
      user.firstName = firstName;
      user.lastName = lastName;
      user.userName = username;
      await this.userRepository.save(user);
    }

    return user;
  }
}
