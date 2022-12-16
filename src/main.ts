import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getBotToken } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  await app.get<Telegraf>(getBotToken()).launch();
}
bootstrap();
