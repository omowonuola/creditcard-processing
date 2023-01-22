import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CardsRepository } from './cards.repository';
import { CardsService } from './cards.service';

const mockCardRepository = () => ({
  getAll: jest.fn(),
  query: jest.fn(),
  create: jest.fn(),
});

const mockCard = [
  {
    id: 'someId',
    cardName: 'Test cardName',
    cardNumber: 4111111111111111,
    limit: 5000,
    balance: 0,
  },
];

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
      cardsRepository.getAll.mockReturnValueOnce('someValue');
      const result = await cardsService.getAllCards();
      expect(result).toEqual('someValue');
    });
    it('calls the CardsRepository.getAll and handles an error', async () => {
      cardsRepository.getAll.mockReturnValueOnce([]);
      await expect(cardsService.getAllCards()).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('getCardByNumber', () => {
    it('calls CardsRepository.query and returns the result', async () => {
      cardsRepository.query.mockReturnValueOnce(mockCard);
      const result = await cardsService.getCardByNumber(0);
      expect(result).toEqual(mockCard);
    });
    it('calls the CardsRepository.query and handles an error', async () => {
      cardsRepository.query.mockReturnValueOnce([]);
      await expect(cardsService.getCardByNumber(0)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('createCard', () => {
    it('calls the CardsRepository.create and returns the result', async () => {
      cardsRepository.query.mockReturnValueOnce([]);
      cardsRepository.create.mockReturnValueOnce(mockCard[0]);
      const result = await cardsService.createCard(mockCard[0]);
      expect(result).toEqual(mockCard[0]);
    });
    it('calls the CardsRepository.create and handles an error', async () => {
      cardsRepository.query.mockReturnValueOnce([mockCard[0]]);
      await expect(cardsService.createCard(mockCard[0])).rejects.toThrowError(
        ConflictException,
      );
    });
  });
});
