// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// declare const global: any;

// async function bootstrap() {

//   // 🛑 PREVENT DOUBLE BOOTSTRAP
//   if (global.__app_started) {
//     return;
//   }
//   global.__app_started = true;

//   const app = await NestFactory.create(AppModule);

//   const port = process.env.PORT ? Number(process.env.PORT) : 3000;

//   await app.listen(port, '0.0.0.0');

//   console.log(`🚀 Server running on port ${port}`);
// }

// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

let isInitialized = false;

async function bootstrap() {
  if (isInitialized) return;
  isInitialized = true;

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
