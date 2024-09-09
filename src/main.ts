import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerHelper } from './helper/swagger-helper';
import { ValidationPipe } from '@nestjs/common';
import { ClassTransformInterceptor } from './global-binded/interceptor/exponse-data.interseptor';

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
  app.useGlobalInterceptors(new ClassTransformInterceptor());

  await new SwaggerHelper().setup(app);

  await app.listen(3005);
}
bootstrap();
