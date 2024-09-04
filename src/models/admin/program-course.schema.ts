import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'program-course' })
export class ProgramCourse {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Program' })
  programId: Types.ObjectId;
  @Prop({ required: false, type: String })
  courseName: string;

  @Prop({ required: false, type: String })
  courseImage: string;

  @Prop({ required: false, type: String })
  collageName: string;

  @Prop({ required: false, type: String })
  courseDescription: string;

  @Prop({ required: false, type: String })
  courseLength: string;

  @Prop({ required: false, type: String })
  credentials: string;

  @Prop({ required: false, type: String })
  availibleIntakes: string;

  @Prop({ required: false, type: String })
  openIntakes: string;

  @Prop({ required: false, type: String })
  applicationFee: string;

  @Prop({ required: false, type: String })
  LOAdeposit: string;

  @Prop({ required: false, type: String })
  annualTuitionFee: string;

  @Prop({ required: false, type: String })
  commissionAmount: string;

  @Prop({ required: false, type: String })
  commissionCurrency: string;

  @Prop({ required: false, type: String })
  commissionType: string;

  @Prop({ required: false, type: String })
  commissionInstallments: string;

  @Prop({ required: false, enum: ['Y', 'N'], default: 'N' })
  published: string;

  @Prop({ required: false, type: String })
  publishedDate: string;
}

export const ProgramCourseSchema = SchemaFactory.createForClass(ProgramCourse);
