import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsCreditCardValid } from 'src/validators/cardsnumber.validator';
import { IsCreditCardNumberDuplicate } from 'src/validators/duplicatecards.validator';

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
  @IsCreditCardNumberDuplicate({ message: 'Duplicate card not allowed' })
  cardNumber: number;

  //   integer validation
  @ApiProperty({ example: 500, description: 'The credit limit for the card' })
  @IsNotEmpty()
  @IsNumber()
  limit: number;
}
