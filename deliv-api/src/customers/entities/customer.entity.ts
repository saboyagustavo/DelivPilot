import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '@prisma/client';

export class CustomerEntity implements Customer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  legalPerson: boolean;
}
