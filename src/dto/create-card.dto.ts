import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsCreditCardValid } from '../validators/cards-number.validator';

export class CreateCardDto {
  @IsOptional()
  id: string;

  @ApiProperty({
    example: 'John Wick',
    description: 'The credit card name',
  })
  @IsNotEmpty()
  @IsString()
  cardName: string;

  //   integer validation
  @ApiProperty({
    example: 4111111111111111,
    description: 'The credit card number',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsCreditCardValid({
    message: `Enter a correct credit card number`,
  })
  cardNumber: number;

  //   integer validation
  @ApiProperty({ example: 500, description: 'The credit limit for the card' })
  @IsNotEmpty()
  @IsNumber()
  limit: number;
}
