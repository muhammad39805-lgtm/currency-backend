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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://ornate-sorbet-0918f3.netlify.app',
    ],
  });

  const port = Number(process.env.PORT) || 3000;

  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
