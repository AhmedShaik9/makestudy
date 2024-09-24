import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class ContactPersonInformationDTO {
  @IsString()
  @IsNotEmpty()
  personName: string;

  @IsString()
  @IsNotEmpty()
  designation: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  countryPhoneCode: string;

  @IsString()
  @IsNotEmpty()
  contactNo: string;
}

class BankDetailDTO {
  @IsString()
  @IsNotEmpty()
  beneficiaryName: string;

  @IsString()
  @IsNotEmpty()
  accountNo: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  bankAddress: string;

  @IsOptional()
  @IsString()
  branchName?: string;

  @IsOptional()
  @IsString()
  bankCode?: string;

  @IsString()
  @IsNotEmpty()
  swiftCode: string;

  @IsOptional()
  @IsString()
  ifscCode?: string; // Only for India

  @IsOptional()
  @IsString()
  panNo?: string;

  @IsOptional()
  @IsString()
  gstNo?: string;
}

export class AgentBasicInfoDTO {
  @IsString()
  @IsNotEmpty()
  agentId: string; // ObjectId as string

  @IsString()
  @IsNotEmpty()
  organizationName: string;

  @IsString()
  @IsNotEmpty()
  agencyHeadOfficeAddress: string;

  @IsOptional()
  @IsNumber()
  noOfBranches?: number;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @ValidateNested()
  @Type(() => ContactPersonInformationDTO)
  contactPersonInformation: ContactPersonInformationDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BankDetailDTO)
  bankDetails: BankDetailDTO[];
}
