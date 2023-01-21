import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from '../dto/create-card.dto';
import { CardEntity } from './cards.entity';
import { CardsRepository } from './cards.repository';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  getAllCards(): CardEntity[] {
    const found = this.cardsRepository.getAll();
    if (found?.length == 0) {
      throw new NotFoundException('No card details found');
    }
    return found;
  }

  getCardByNumber(cardNumber: number): CardEntity[] {
    const result = this.cardsRepository.query(
      (Card) => Card.cardNumber == cardNumber,
    );
    if (result.length == 0) {
      throw new NotFoundException(`Card number ${cardNumber} not found`);
    }
    return result;
  }

  createCard(payload: CreateCardDto): CardEntity {
    const { id, cardName, cardNumber, limit } = payload;

    const card: CardEntity = {
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
