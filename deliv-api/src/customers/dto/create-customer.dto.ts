import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class CreateCustomerDto {
  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsBoolean()
  @ApiProperty()
  legalPerson: boolean;
}
