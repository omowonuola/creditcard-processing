import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateCardDto } from '../dto/create-card.dto';
import { CardEntity } from './cards.entity';
import { CardsService } from './cards.service';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all credit card' })
  @ApiResponse({ description: 'return all records', type: CardEntity })
  getAllCards(): Promise<CardEntity[]> {
    return this.cardService.getAllCards();
  }

  @Get('/:cardNumber')
  @ApiOperation({ summary: 'Get a credit card by card number' })
  @ApiResponse({
    description: 'return an existing card number',
    type: CardEntity,
  })
  getCardByNumber(
    @Param('cardNumber') cardNumber: number,
  ): Promise<CardEntity[]> {
    return this.cardService.getCardByNumber(cardNumber);
  }

  @Post()
  @ApiOperation({ summary: 'Create new credit card' })
  @ApiResponse({ description: 'returns the details of the new credit card.' })
  createCard(@Body() payload: CreateCardDto): Promise<CardEntity> {
    return this.cardService.createCard(payload);
  }
}
