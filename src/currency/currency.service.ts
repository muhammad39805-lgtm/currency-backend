import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversion } from './entities/conversion.entity';
import { ConvertDto } from './dto/convert.dto';

@Injectable()
export class CurrencyService {
  private readonly API_KEY = process.env.CURRENCY_API_KEY;
  private readonly BASE_URL = 'https://api.freecurrencyapi.com/v1';

  constructor(
    @InjectRepository(Conversion)
    private conversionRepo: Repository<Conversion>,
  ) { }

  // ✅ Currency List
  async list() {
    const res = await axios.get(`${this.BASE_URL}/currencies`, {
      params: { apikey: this.API_KEY },
    });
    return res.data;
  }

  // ✅ Convert (Latest + Historical)
  // async convert(dto: ConvertDto) {
  //   const { from, to, amount, date } = dto;

  //   const endpoint = date ? 'historical' : 'latest';

  //   const res = await axios.get(`${this.BASE_URL}/${endpoint}`, {
  //     params: {
  //       apikey: this.API_KEY,
  //       base_currency: from.toUpperCase(),
  //       currencies: to.toUpperCase(),
  //       ...(date && { date }),
  //     },
  //   });

  //   const rate =
  //     res.data?.data?.[date ?? ''][to.toUpperCase()] ??
  //     res.data?.data?.[to.toUpperCase()];

  //   if (!rate) {
  //     throw new HttpException('Invalid currency code', 400);
  //   }

  //   const convertedAmount = rate * amount;

  //   // ✅ SAVE HISTORY
  //   const record = this.conversionRepo.create({
  //     fromCurrency: from.toUpperCase(),
  //     toCurrency: to.toUpperCase(),
  //     amount,
  //     rate,
  //     convertedAmount,
  //     conversionDate: date ?? 'latest',
  //   });

  //   await this.conversionRepo.save(record);

  //   return record;
  // }

  async convert(dto: ConvertDto) {
    const { from, to, amount, date } = dto;

    const endpoint = date ? 'historical' : 'latest';

    let res;
    try {
      res = await axios.get(`${this.BASE_URL}/${endpoint}`, {
        params: {
          apikey: this.API_KEY,
          base_currency: from.toUpperCase(),
          currencies: to.toUpperCase(),
          ...(date && { date }),
        },
      });
    } catch {
      throw new HttpException('Currency API request failed', 502);
    }

    let rate: number | undefined;

    if (date) {
      // Historical
      rate = res.data?.data?.[date]?.[to.toUpperCase()];
    } else {
      // Latest
      rate = res.data?.data?.[to.toUpperCase()];
    }

    if (!rate) {
      throw new HttpException(
        'Exchange rate not found for the requested date or currency',
        400,
      );
    }

    const convertedAmount = rate * amount;

    const record = this.conversionRepo.create({
      fromCurrency: from.toUpperCase(),
      toCurrency: to.toUpperCase(),
      amount,
      rate,
      convertedAmount,
      conversionDate: date ?? 'latest',
    });

    await this.conversionRepo.save(record);

    return record;
  }



  async history() {
    return this.conversionRepo.find({
      order: { createdAt: 'DESC' },
    });
  }
}
  