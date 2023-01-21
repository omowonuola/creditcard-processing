import { Controller, NotFoundException } from '@nestjs/common';
import { Card } from './cards.entity';
import { CardsRepository } from './cards.repository';

@Controller('cards')
export class CardsController {

}
