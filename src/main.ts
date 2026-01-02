import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://ornate-sorbet-0918f3.netlify.app',
    ],
  });

  await app.init();
}

bootstrap();

export default server;
