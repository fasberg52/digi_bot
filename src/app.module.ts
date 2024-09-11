import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/data-source';
import { SubscribeModule } from './subscribe/subscribe.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserSubscribeModule } from './user-subscribe/user-subscribe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    SubscribeModule,
    TransactionModule,
    UserSubscribeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
