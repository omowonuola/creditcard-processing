import { Test, TestingModule } from '@nestjs/testing';
import { CardsRepository } from './cards.repository';
import { CardsService } from './cards.service';

const mockCardRepository = () => ({
  getCards: jest.fn(),
});
describe('CardsService', () => {
  let cardsService: CardsService;
  let cardsRepository: CardsRepository;
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

  //   it('should be defined', () => {
  //     expect(cardsService).toBeDefined();
  //   });

  describe('getAllCards', () => {
    it('calls the CardsRepository.getAll and return the result', () => {
      expect(cardsRepository.getAll).not.toHaveBeenCalled();
      //   call cardsService.getCards, which should then call the repository's getCards
      cardsService.getAllCards();
      expect(cardsRepository.getAll).toHaveBeenCalled();
    });
  });
});
