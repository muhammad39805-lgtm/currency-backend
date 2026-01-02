// ⚠️ VERCEL PAR YE FILE USE NAHI HOTI
// Sirf local development ke liye

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  await app.listen(3000);
}
bootstrap();
