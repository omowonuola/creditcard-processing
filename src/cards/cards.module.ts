import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsRepository } from './cards.repository';
import { CardsService } from './cards.service';

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardsRepository],
  imports: [InMemoryDBModule.forRoot({})],
})
export class CardsModule {}
