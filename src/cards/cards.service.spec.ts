import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CardsRepository } from './cards.repository';
import { CardsService } from './cards.service';

const mockCardRepository = () => ({
  getAll: jest.fn(),
  query: jest.fn(),
  create: jest.fn(),
});

const mockCard = {
  id: 'someId',
  cardName: 'Test cardName',
  cardNumber: 4111111111111111,
  limit: 5000,
  balance: 0,
};

describe('CardsService', () => {
  let cardsService: CardsService;
  let cardsRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        { provide: CardsRepository, useFactory: mockCardRepository },
      ],
    }).compile();

    cardsService = module.get<CardsService>(CardsService);
    cardsRepository = module.get(CardsRepository);
  });

  describe('getAllCards', () => {
    it('calls the CardsRepository.getAll and return the result', async () => {
      cardsRepository.getAll.mockResolvedValue('someValue');
      const result = await cardsService.getAllCards();
      expect(result).toEqual('someValue');
    });

    it('calls the CardsRepository.getAll and handles an error', async () => {
      cardsRepository.getAll.mockResolvedValue([]);
      await expect(cardsService.getAllCards()).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('getCardByNumber', () => {
    it('calls CardsRepository.query and returns the result', async () => {
      cardsRepository.query.mockResolvedValue(mockCard);
      const result = await cardsService.getCardByNumber(0);
      expect(result).toEqual(mockCard);
    });

    it('calls the CardsRepository.query and handles an error', async () => {
      cardsRepository.query.mockResolvedValue([]);
      await expect(cardsService.getCardByNumber(0)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('createCard', () => {
    it('calls the CardsRepository.create and returns the result', async () => {
      cardsRepository.create.mockResolvedValue(mockCard);
      const result = await cardsService.createCard(mockCard);
      expect(result).toEqual(mockCard);
    });
    it('calls the CardsRepository.create and handles an error', async () => {
      cardsRepository.create.mockResolvedValue(mockCard.cardNumber);
      await expect(cardsService.getCardByNumber(0)).rejects.toThrowError(
        ConflictException,
      );
    });
  });
});
