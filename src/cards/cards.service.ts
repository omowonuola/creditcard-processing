import { Injectable, NotFoundException } from '@nestjs/common';
import { Card } from './cards.entity';
import { CardsRepository } from './cards.repository';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  getAllCards(): Card[] {
    const found = this.cardsRepository.getAll();
    if (found.length == 0) {
      throw new NotFoundException('No card details found');
    }
    return found;
  }
}
