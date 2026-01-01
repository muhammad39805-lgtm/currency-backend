import { IsString, IsNumber, IsOptional } from 'class-validator';

export class ConvertDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  date?: string;
}
