import { Test } from '@nestjs/testing';
import { CardNumberValidator } from './cards-number.validator';

describe('LuhnService', () => {
  let service: CardNumberValidator;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [CardNumberValidator],
    }).compile();
    service = module.get<CardNumberValidator>(CardNumberValidator);
  });

  it('should return true for valid credit card number', () => {
    expect(service.validate(4485275742308327)).toBeTruthy();
  });

  it('should return false for invalid credit card number', () => {
    expect(service.validate(1234567812345678)).toBeFalsy();
  });
});
