import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { Conversion } from './entities/conversion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversion])],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
