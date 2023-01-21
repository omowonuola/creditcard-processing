import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post()
  createCard(@Body() payload: CreateCardDto): Card {
    return this.cardService.createCard(payload);
  }
}
