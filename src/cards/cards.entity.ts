import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { ApiProperty } from '@nestjs/swagger';

export class CardEntity implements InMemoryDBEntity {
  id: string;
  /**
   * The card name
   * @example John Wick
   */
  @ApiProperty({
    example: 'John Wick',
    description: 'The credit card name',
  })
  cardName: string;

  @ApiProperty({
    example: 4111111111111111,
    description: 'The credit card number',
  })
  cardNumber: number;

  @ApiProperty({ example: 500, description: 'The credit limit for the card' })
  limit: number;

  @ApiProperty({
    example: 0,
    description: 'The initial balance for the card',
  })
  balance: number;
}
