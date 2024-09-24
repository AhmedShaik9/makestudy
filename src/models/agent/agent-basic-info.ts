import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class AgentBasicInfo extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  agentId: Types.ObjectId;

  @Prop({ required: true })
  organizationName: string;

  @Prop({ required: true })
  agencyHeadOfficeAddress: string;

  @Prop({ type: Number, default: 1 })
  noOfBranches: number;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  city: string;

  @Prop({
    type: {
      personName: { type: String, required: true },
      designation: { type: String, required: true },
      email: { type: String, required: true },
      countryPhoneCode: { type: String, required: true },
      contactNo: { type: String, required: true },
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
        beneficiaryName: { type: String, required: true },
        accountNo: { type: String, required: true },
        bankName: { type: String, required: true },
        bankAddress: { type: String, required: true },
        branchName: { type: String },
        bankCode: { type: String },
        swiftCode: { type: String, required: true },
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
