import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class OTP extends Document {
  @Prop({ required: true })
  otpCode: string;

  @Prop({ required: true, default: Date.now, expires: 60 })
  createdAt: Date;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  isUsed: boolean;

  @Prop({ required: true, type: Boolean, default: false })
  validated: boolean;
}

export const OTPSchema = SchemaFactory.createForClass(OTP);
