import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-telegram';
import { AuthService } from '../auth.service';
import { TelegramProfileDto } from '../dto/login-telegram.dto';

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.TELEGRAM_BOT_API,
      passReqToCallback: true,
    });
  }
  async validate(req: any, profile: any, done: any) {
    const telegramProfile: TelegramProfileDto = {
      id: profile.id,
      username: profile.username,
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone_number: profile.phone_number,
    };
    try {
      const user = await this.authService.loginTelegram(telegramProfile);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
