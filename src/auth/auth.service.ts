import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';
import { RegisterResponse } from './auth.interface';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);
    if (!user) return null;
    const isValidPassword = await this.usersService.comparePassword(
      password,
      user.password,
    );
    if (!isValidPassword) return null;
    return user;
  }

  async login(LoginAuthDto: LoginAuthDto): Promise<any> {
    const { password, email } = LoginAuthDto;
    const user = await this.validateUser(email, password);
    console.log(user, 'EE');
    if (!user) throw new BadRequestException('email or password are incorrect');

    return 'login exitoso';
  }

  async register(RegisterAuthDto: RegisterAuthDto): Promise<RegisterResponse> {
    await this.usersService.create(RegisterAuthDto);
    return { status: 'successful user registration' };
  }
}
