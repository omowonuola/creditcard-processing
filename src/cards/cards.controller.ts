import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCardDto } from 'src/dto/create-card.dto';
import { Card } from './cards.entity';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Get()
  getAllCards(): Card[] {
    return this.cardService.getAllCards();
  }

  @Get('/:cardNumber')
  getCardByNumber(@Param('cardNumber') cardNumber: number): Card[] {
    return this.cardService.getCardByNumber(cardNumber);
  }

  @Post()
  createCard(@Body() payload: CreateCardDto): Card {
    return this.cardService.createCard(payload);
  }
}
