import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateCardDto } from 'src/dto/create-card.dto';
import { CardEntity } from './cards.entity';
import { CardsService } from './cards.service';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Get()
  @ApiResponse({ description: 'return all records', type: CardEntity })
  getAllCards(): CardEntity[] {
    return this.cardService.getAllCards();
  }

  @Get('/:cardNumber')
  @ApiResponse({
    description: 'return an existing card number',
    type: CardEntity,
  })
  getCardByNumber(@Param('cardNumber') cardNumber: number): CardEntity[] {
    return this.cardService.getCardByNumber(cardNumber);
  }

  @Post()
  @ApiOperation({ summary: 'Create new credit card' })
  @ApiResponse({ description: 'Forbidden.' })
  createCard(@Body() payload: CreateCardDto): CardEntity {
    return this.cardService.createCard(payload);
  }
}
