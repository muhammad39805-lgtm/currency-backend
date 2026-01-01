import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Conversion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fromCurrency: string;

  @Column()
  toCurrency: string;

  @Column('float')
  amount: number;

  @Column('float')
  rate: number;

  @Column('float')
  convertedAmount: number;

  @Column({ nullable: true })
  conversionDate: string;

  @CreateDateColumn()
  createdAt: Date;
}
