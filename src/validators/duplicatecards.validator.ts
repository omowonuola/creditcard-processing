import { BadRequestException, ConflictException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CardsRepository } from '../cards/cards.repository';

@ValidatorConstraint({ async: false })
export class CardNumberDuplicate implements ValidatorConstraintInterface {
  constructor(private readonly cardsRepository: CardsRepository) {}
  validate(cardNumber: number) {
    if (cardNumber?.toString().length > 19) {
      throw new BadRequestException('card number must not be greater than 19');
    }
    // check out for duplicate card number
    const result = this.cardsRepository.query(
      (Card) => Card.cardNumber == cardNumber,
    );
    console.log(result, 'reap');

    if (result.length > 0) {
      throw new ConflictException('Card number already exists');
    }
    return true;
  }
}

export function IsCreditCardNumberDuplicate(
  validationOptions: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsCreditCardNumberDuplicate',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: CardNumberDuplicate,
    });
  };
}
