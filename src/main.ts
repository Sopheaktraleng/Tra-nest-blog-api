import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
