import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: true })
export class Permission {
  @Prop({
    required: true,
    minlength: 3,
    maxlength: 60,
    lowercase: true,
  })
  name: string;

  @Prop({
    required: true,
    minlength: 3,
    maxlength: 60,
    lowercase: true,
  })
  description: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
