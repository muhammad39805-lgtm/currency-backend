// import { Controller, Get, Query } from '@nestjs/common';
// import { CurrencyService } from './currency.service';
// import { ConvertDto } from './dto/convert.dto';

// @Controller('currency')
// export class CurrencyController {
//   constructor(private readonly service: CurrencyService) {}

//   @Get('list')
//   list() {
//     return this.service.list();
//   }

//   @Get('convert')
//   convert(@Query() dto: ConvertDto) {
//     return this.service.convert(dto);
//   }

//   @Get('history')
//   history() {
//     return this.service.history();
//   }
// }


import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ConvertDto } from './dto/convert.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly service: CurrencyService) {}

  @Get('list')
  list() {
    return this.service.list();
  }

  @Get('convert')
  convert(@Query() dto: ConvertDto) {
    return this.service.convert(dto);
  }

  @Get('history')
  history() {
    return this.service.history();
  }
}
