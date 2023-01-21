import { BadRequestException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class CardNumberValidator implements ValidatorConstraintInterface {
  validate(cardNumber: number) {
    if (!cardNumber || cardNumber.toString().length > 19) {
      throw new BadRequestException(
        'Kindly add card number and must not greater than 19',
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
