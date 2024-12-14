import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  optimisticConcurrency: true,
  collection: 'online-auth',
})
export class OnlineAuth {
  @Prop({ required: true, type: String })
  firstName: string;
  @Prop({ required: true, type: String })
  lastName: string;
  @Prop({ required: true, type: String })
  email: string;
  @Prop({ required: false, type: String })
  password: string;
  @Prop({ required: false, type: String })
  role: string;
  @Prop({ required: false, type: String })
  status: string;
  @Prop({ required: true, type: String })
  phoneNumber: string;
  @Prop({ required: true, type: String })
  nationality: string;
}
export const OnlineAuthSchema = SchemaFactory.createForClass(OnlineAuth);
