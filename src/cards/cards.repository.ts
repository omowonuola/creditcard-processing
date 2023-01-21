import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { CardEntity } from './cards.entity';

export class CardsRepository extends InMemoryDBService<CardEntity> {}
