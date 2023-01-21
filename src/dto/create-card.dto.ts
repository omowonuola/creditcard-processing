import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsCreditCardValid } from 'src/cards/cards.validator';

export class CreateCardDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  cardName: string;

  //   integer validation
  @IsNotEmpty()
  @IsNumber()
  @IsCreditCardValid({
    message: `Enter a correct credit card number`,
  })
  cardNumber: number;

  //   integer validation
  @IsNotEmpty()
  @IsNumber()
  limit: number;
}
