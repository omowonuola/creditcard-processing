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

  async getAllCards(): Promise<CardEntity[]> {
    const cards = this.cardsRepository.getAll();
    if (!cards || cards.length === 0) {
      throw new NotFoundException('No card details found');
    }
    return cards;
  }

  async getCardByNumber(cardNumber: number): Promise<CardEntity[]> {
    const card = this.cardsRepository.query(
      (Card) => Card.cardNumber == cardNumber,
    );
    if (!card || card.length == 0) {
      throw new NotFoundException(`Card number ${cardNumber} not found`);
    }
    return card;
  }

  async createCard(payload: CreateCardDto): Promise<CardEntity> {
    const { id, cardName, cardNumber, limit } = payload;

    const newCard: CardEntity = {
      id,
      cardName,
      cardNumber,
      limit,
      balance: 0,
    };
    // check out for duplicate card number
    const cardFound = this.cardsRepository.query(
      (Card) => Card.cardNumber == cardNumber,
    );
    console.log(cardFound, 'found');
    if (!cardFound || cardFound.length > 0) {
      throw new ConflictException('Card number already exists');
    }
    const newCardValue = this.cardsRepository.create(newCard);
    console.log(newCardValue, 'newvalue');
    return newCardValue;
  }
}
