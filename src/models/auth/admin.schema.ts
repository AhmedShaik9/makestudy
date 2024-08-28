import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Admin extends Document {
  @Prop({ required: false, type: Number })
  id?: number;
  @Prop({ required: true, default: '' })
  username: string;

  @Prop({ required: true, default: '' })
  password: string;

  @Prop({ required: true, default: '' })
  type: string;

  @Prop({ required: true, default: '' })
  name: string;

  @Prop({ required: true, default: '' })
  email: string;

  @Prop({ required: true, default: '' })
  notification_email: string;

  @Prop({ required: true, default: '' })
  phone: string;

  @Prop({ required: true, default: '' })
  address: string;

  @Prop({ required: true, default: '' })
  company: string;

  @Prop({ required: true, default: '' })
  filename: string;

  @Prop({ required: true, default: '' })
  designation: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
