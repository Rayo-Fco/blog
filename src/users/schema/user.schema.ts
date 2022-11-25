import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Permission } from './permission.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    minlength: 3,
    maxlength: 40,
    lowercase: true,
  })
  name: string;

  @Prop({
    required: true,
    minlength: 3,
    maxlength: 40,
    lowercase: true,
  })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    minlength: 6,
    maxlength: 120,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 255,
  })
  password: string;

  @Prop({ ref: 'permissions' })
  permissions: Permission[];

  @Prop({ ref: 'roles', required: true })
  roles: number;

  @Prop()
  active: boolean;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
