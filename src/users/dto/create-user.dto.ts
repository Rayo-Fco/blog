import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'name has to be text only' })
  @IsNotEmpty({ message: 'name is required' })
  @Length(3, 40, {
    message: 'name is invalid',
  })
  @ApiProperty({ example: 'John' })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: 'lastname is required' })
  @Length(3, 40, {
    message: 'lastname is invalid',
  })
  @ApiProperty({ example: 'Herrera' })
  readonly lastName: string;

  @IsEmail()
  @IsString()
  @Length(6, 120, {
    message: 'email is invalid',
  })
  @ApiProperty({ example: 'johnherrera@gmail.com' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'country is required' })
  @ApiProperty({ example: 'Spain' })
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d].{6,}$/, {
    message:
      'the password must have at least one uppercase letter, one lowercase letter, and one number.',
  })
  @ApiProperty({ example: '1234ABC' })
  readonly password: string;

  readonly createdAt?: Date;

  readonly updatedAt?: Date;

  readonly roles: number;
}
