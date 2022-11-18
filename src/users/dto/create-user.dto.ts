import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'name has to be text only' })
  @IsNotEmpty({ message: 'name is required' })
  @ApiProperty({ example: 'John' })
  readonly name: string;

  @IsString()
  @IsNotEmpty({
    message: 'lastname is required',
    context: {
      errorCode: 1003,
      developerNote: 'The validated string must contain 32 or more characters.',
    },
  })
  @ApiProperty({ example: 'Herrera' })
  readonly lastName: string;

  @IsEmail()
  @IsString()
  @MaxLength(250)
  @ApiProperty({ example: 'johnherrera@gmail.com' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'country is required' })
  @ApiProperty({ example: 'Spain' })
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1234ABC' })
  readonly password: string;

  @ApiProperty({ example: '2021-01-15T06:31:15Z' })
  readonly createdAt?: Date;

  @ApiProperty({ example: '2021-01-15T06:31:15Z' })
  readonly updatedAt?: Date;
}
