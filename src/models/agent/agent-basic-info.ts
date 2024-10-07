import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class AgentBasicInfo extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  agentId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: false })
  organizationName: string;

  @Prop({ required: false })
  agencyHeadOfficeAddress: string;

  @Prop({ type: Number, default: 1 })
  noOfBranches: number;

  @Prop({ required: false, type: String })
  country: string;

  @Prop({ required: false, type: String })
  state: string;

  @Prop({ required: false, type: String })
  city: string;

  @Prop({
    type: {
      personName: { type: String, required: false },
      designation: { type: String, required: false },
      email: { type: String, required: false },
      countryPhoneCode: { type: String, required: false },
      contactNo: { type: String, required: false },
    },
    required: false,
  })
  contactPersonInformation: {
    personName: string;
    designation: string;
    email: string;
    countryPhoneCode: string;
    contactNo: string;
  };

  @Prop({
    type: [
      {
        beneficiaryName: { type: String, required: false },
        accountNo: { type: String, required: false },
        bankName: { type: String, required: false },
        bankAddress: { type: String, required: false },
        branchName: { type: String },
        bankCode: { type: String },
        swiftCode: { type: String, required: false },
        ifscCode: { type: String }, // Only for India
        panNo: { type: String },
        gstNo: { type: String },
      },
    ],
    required: false,
  })
  bankDetails: [
    {
      beneficiaryName: string;
      accountNo: string;
      bankName: string;
      bankAddress: string;
      branchName?: string;
      bankCode?: string;
      swiftCode: string;
      ifscCode?: string;
      panNo?: string;
      gstNo?: string;
    },
  ];
}

export const AgentBasicInfoSchema =
  SchemaFactory.createForClass(AgentBasicInfo);
