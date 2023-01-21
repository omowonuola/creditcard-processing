import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class Card implements InMemoryDBEntity {
  id: string;
  cardName: string;
  cardNumber: number;
  limit: number;
  balance: number;
}
