import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentInfoDocument = StudentInfo & Document;

@Schema()
export class StudentInfo {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  maritalStatus: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  countryPhoneCode: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop()
  alternateNumber?: string;

  @Prop({ required: true })
  nativeCountry: string;

  @Prop({ required: true })
  nativeProvinceOrState: string;

  @Prop({ required: true })
  nativeCity: string;

  @Prop({ required: true })
  completeAddress: string;

  @Prop({ required: true })
  pincode: string;

  @Prop({ required: true })
  fatherName: string;

  @Prop()
  fatherEmail?: string;

  @Prop()
  fatherContact?: string;

  @Prop({ required: true })
  motherName: string;

  @Prop()
  motherEmail?: string;

  @Prop()
  motherContact?: string;

  @Prop({
    type: [
      {
        class: { type: String, required: true },
        yearPassed: { type: Number, required: true },
        streamSubject: { type: String, required: true },
        boardSchool: { type: String, required: true },
        cgpa: { type: Number, required: true },
      },
    ],
  })
  educationDetails: {
    class: string;
    yearPassed: number;
    streamSubject: string;
    boardSchool: string;
    cgpa: number;
  }[];
}

export const StudentInfoSchema = SchemaFactory.createForClass(StudentInfo);
