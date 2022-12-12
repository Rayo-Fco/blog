import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './schema/role.schema';
import { User, UserDocument } from './schema/user.schema';
import ROLES from './users.roles';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  private readonly userRole = ROLES.USER;
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async comparePassword(
    password: string,
    storePassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, storePassword);
  }
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(process.env.SALT) | 10);
    return await bcrypt.hash(password, salt);
  }

  async create(createUserDto: CreateUserDto): Promise<string> {
    const user = await this.findOne(createUserDto.email);
    if (user) throw new BadRequestException(['email is already registered']);
    await this.userModel.create({
      ...createUserDto,
      roles: this.userRole,
      password: await this.hashPassword(createUserDto.password),
    });
    return 'user created';
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('roles', null, Role.name).exec();
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.userModel.findByIdAndRemove({ _id: id }).exec();
  }
}
