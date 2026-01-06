// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
// import { CurrencyModule } from './currency/currency.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     // TypeOrmModule.forRoot({
//     //   type: 'sqlite',
//     //   database: 'currency.db',
//     //   autoLoadEntities: true,
//     //   synchronize: true,
//     // }),
//     TypeOrmModule.forRoot({
//       type: 'sqlite',
//       database: process.env.DB_PATH || '/data/database.sqlite',
//       autoLoadEntities: true,
//       synchronize: true,
//     }),

//     CurrencyModule,
//   ],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',  
      autoLoadEntities: true,
      synchronize: true,
    }),

    CurrencyModule,
  ],
})
export class AppModule {}
