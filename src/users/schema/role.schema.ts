import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Permission } from './permission.schema';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop()
  _id: number;

  @Prop({
    required: true,
    minlength: 3,
    maxlength: 40,
    lowercase: true,
  })
  name: string;

  @Prop({ ref: 'permissions' })
  permissions: Permission[];

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
