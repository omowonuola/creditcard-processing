import { Test, TestingModule } from '@nestjs/testing';
import { CardsRepository } from './cards.repository';
import { CardsService } from './cards.service';

const mockCardRepository = () => ({
  getAll: jest.fn(),
});
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
  });
});
