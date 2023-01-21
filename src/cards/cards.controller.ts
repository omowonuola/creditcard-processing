import { Controller } from '@nestjs/common';
import { Card } from './cards.entity';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}
  getAllCards(): Card[] {
    return this.cardService.getAllCards();
  }
}
