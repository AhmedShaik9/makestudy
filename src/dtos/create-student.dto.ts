import {
  IsString,
  IsEmail,
  IsDate,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDate()
  dateOfBirth: Date;

  @IsString()
  gender: string;

  @IsString()
  maritalStatus: string;

  @IsEmail()
  email: string;

  @IsString()
  countryPhoneCode: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  alternateNumber?: string;

  @IsString()
  nativeCountry: string;

  @IsString()
  nativeProvinceOrState: string;

  @IsString()
  nativeCity: string;

  @IsString()
  completeAddress: string;

  @IsString()
  pincode: string;

  @IsString()
  fatherName: string;

  @IsOptional()
  @IsEmail()
  fatherEmail?: string;

  @IsOptional()
  @IsString()
  fatherContact?: string;

  @IsString()
  motherName: string;

  @IsOptional()
  @IsEmail()
  motherEmail?: string;

  @IsOptional()
  @IsString()
  motherContact?: string;

  @IsArray()
  educationDetails: {
    class: string;
    yearPassed: number;
    streamSubject: string;
    boardSchool: string;
    cgpa: number;
  }[];
}
