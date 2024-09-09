import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerHelper } from './helper/swagger-helper';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors();
  await new SwaggerHelper().setup(app);

  await app.listen(3005);
}
bootstrap();
