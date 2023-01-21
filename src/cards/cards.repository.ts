import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Card } from './cards.entity';

export class CardsRepository extends InMemoryDBService<Card> {}
