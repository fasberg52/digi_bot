import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerHelper } from './helper/swagger-helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await new SwaggerHelper().setup(app);
  await app.listen(3005);
}
bootstrap();
