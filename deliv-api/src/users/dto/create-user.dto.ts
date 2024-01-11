import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail(null, {
    message: `Please enter a valid email address like 'example@example.com'`,
  })
  email: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6, {
    message: 'Your password must contain at least 6 digits or over',
  })
  password: string;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;
}
