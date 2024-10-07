import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: false })
  first_name: string;

  @Prop({ required: false })
  last_name: string;

  @Prop({ required: false })
  company: string;

  @Prop({ default: '', type: String })
  user_code: string;

  @Prop({ required: false })
  gender: string;

  @Prop({ default: '' })
  dob: string;

  @Prop({ required: false, unique: true })
  email: string;

  @Prop({ default: '' })
  email2: string;

  @Prop({ enum: ['Y', 'N'], default: 'N' })
  send_notification_to_email2: 'Y' | 'N';

  @Prop({ default: '' })
  email3: string;

  @Prop({ enum: ['Y', 'N'], default: 'N' })
  send_notification_to_email3: 'Y' | 'N';

  @Prop({ required: false, default: '' })
  password: string;

  @Prop({ default: null })
  password_text: string | null;

  @Prop({ required: false })
  mobile_no: string;

  @Prop({ required: false })
  country_code: string;

  @Prop({ required: false })
  whatsapp_no: string;

  @Prop({ default: '' })
  phone_no: string;

  @Prop({ required: false })
  address: string;

  @Prop({ required: false })
  city_id: number;

  @Prop({ required: false })
  state_id: number;

  @Prop({ required: false })
  country_id: number;

  @Prop({ required: false })
  pincode: string;

  @Prop({ default: '' })
  filename: string;

  @Prop({ enum: ['Y', 'N'], default: 'N' })
  is_enabled: 'Y' | 'N';

  @Prop({ enum: ['Y', 'N'], default: 'N' })
  is_deleted: 'Y' | 'N';

  @Prop({ required: false, enum: ['agent', 'user'], default: 'agent' })
  usertype: string;

  @Prop({ default: null })
  designation: string | null;

  @Prop({ enum: ['Y', 'N'], default: 'N' })
  has_apply_permission: 'Y' | 'N';

  @Prop({ type: Date })
  added_on: Date;

  @Prop({ required: false, type: Date })
  updated_on: Date;

  @Prop({ default: null })
  last_login: Date | null;

  @Prop({ enum: ['Y', 'N'], default: 'N' })
  show_commission: 'Y' | 'N';

  @Prop({ required: false })
  commission_category: number;

  @Prop({ default: null })
  website: string | null;

  @Prop({ default: null })
  registration_no: string | null;

  @Prop({ default: null })
  agreement_filename: string | null;

  @Prop({ enum: ['Y', 'N'], default: 'N' })
  is_agreement_signed: 'Y' | 'N';

  @Prop({ default: '' })
  agent_registration_filename: string;

  @Prop({ default: null })
  agreement_date: Date | null;

  @Prop({ default: null })
  agent_signature_filename: string | null;

  @Prop({ default: null })
  agent_identity_proof_file: string | null;

  @Prop({ enum: ['ON', 'OFF'], default: 'OFF' })
  sms_notifications: 'ON' | 'OFF';

  @Prop({ enum: ['Y', 'N'], default: 'Y' })
  email_notification_permission: 'Y' | 'N';

  @Prop({ default: '' })
  facebook: string;

  @Prop({ default: '' })
  twitter: string;

  @Prop({ default: '' })
  instagram: string;

  @Prop({ default: '' })
  linked_in: string;

  @Prop({ enum: ['Y', 'N'], default: 'N' })
  show_profile_image_permission: 'Y' | 'N';

  @Prop({ default: null })
  password_reset_token: string | null;

  @Prop({ default: null })
  password_reset_link_valid_time: Date | null;

  @Prop({ default: 0 })
  ab_school_user: number;

  @Prop({ enum: ['active', 'inactive'], default: 'inactive' })
  verified: 'active' | 'inactive';
}

export const UserSchema = SchemaFactory.createForClass(User);
