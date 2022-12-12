import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';

export class LoginAuthDto {
  @IsEmail(
    {},
    {
      message: 'email or password is invalid',
    },
  )
  @ApiProperty({ example: 'johnherrera@gmail.com' })
  readonly email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d].{6,}$/, {
    message: 'email or password is invalid',
  })
  @ApiProperty({ example: '1234ABC' })
  readonly password: string;

  readonly connectedAt: Date;
}
