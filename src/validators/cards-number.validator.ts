import { BadRequestException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const cardNumberSize = 19;

@ValidatorConstraint({ async: false })
export class CardNumberValidator implements ValidatorConstraintInterface {
  validate(cardNumber: number) {
    if (cardNumber?.toString().length > cardNumberSize) {
      throw new BadRequestException(
        'credit card number must not be greater than 19',
      );
    }
    const arr = (cardNumber + '')
      .split('')
      .reverse()
      .map((x) => parseInt(x));
    const lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce(
      (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
      0,
    );
    sum += lastDigit;
    return sum % 10 === 0;
  }
}

export function IsCreditCardValid(validationOptions: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsCreditCardValid',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: CardNumberValidator,
    });
  };
}
