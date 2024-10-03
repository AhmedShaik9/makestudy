import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ViewOn } from 'src/types/view-on';

@Schema({ timestamps: true, collection: 'program-course' })
export class ProgramCourse {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
  })
  programId: mongoose.Schema.Types.ObjectId;
  @Prop({ required: false, type: String })
  courseName: string;

  @Prop({ required: false, type: String })
  courseImage: string;

  @Prop({ required: true, type: String, unique: true, slug: 'courseName' })
  slug: string;

  @Prop({ required: false, type: String })
  country: string;
  @Prop({ required: false, type: String })
  city: string;
  @Prop({ required: false, type: String })
  courseDetails: string;
  @Prop({ required: false, type: String })
  courseRequirements: string;

  @Prop({ required: false, type: String })
  languageRequirements: string;

  @Prop({ required: false, type: String })
  careerOpportunities: string;

  @Prop({ required: false, type: String })
  courseHighlights: string;
  @Prop({ required: false, type: String })
  collageName: string;

  @Prop({ required: false, type: String })
  courseDescription: string;

  @Prop({ required: false, type: String })
  duration: string;

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
  seatConfirmationDeposit: string;

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

  @Prop({ required: true, enum: ViewOn, default: ViewOn.Hide })
  viewOn: ViewOn;
}

export const ProgramCourseSchema = SchemaFactory.createForClass(ProgramCourse);
