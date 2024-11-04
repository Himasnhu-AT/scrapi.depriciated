import { NestFactory } from '@nestjs/core';
import { ScrapperModule } from './scrapper.module';

async function bootstrap() {
  const app = await NestFactory.create(ScrapperModule);
  await app.listen(4002);
}
bootstrap();
