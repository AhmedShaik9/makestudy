import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, optimisticConcurrency: true })
export class Blog extends Document {
  @Prop({ type: Number, required: false })
  id: number;

  @Prop({ type: String, required: false })
  title: string;

  @Prop({ type: String, required: false })
  slug: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: String, required: false })
  featured_image: string;

  @Prop({ type: String, required: false })
  thumb_image: string;

  @Prop({ type: Date, default: Date.now })
  added_date: Date;

  @Prop({ type: Date, default: Date.now })
  updated_date: Date;

  @Prop({ type: String, enum: ['Y', 'N'], default: 'N' })
  is_published: string;

  @Prop({ type: Date })
  publish_date: Date;

  @Prop({ type: String, enum: ['Y', 'N'], default: 'N' })
  is_deleted: string;
}

export const BlogsSchema = SchemaFactory.createForClass(Blog);
