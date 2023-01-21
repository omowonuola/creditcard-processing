import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from 'src/dto/create-card.dto';
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

  createCard(payload: CreateCardDto): Card {
    const { id, cardName, cardNumber, limit } = payload;

    const card: Card = {
      id,
      cardName,
      cardNumber,
      limit,
      balance: 0,
    };
    // check out for duplicate card number
    const count = this.cardsRepository.query(
      (Card) => Card.cardNumber == cardNumber,
    );
    if (count.length > 0) {
      throw new ConflictException('Card number already exists');
    }
    return this.cardsRepository.create(card);
  }
}
