import { IsString, IsEmail, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  company: string;

  @IsString()
  @IsOptional()
  user_code?: string;

  @IsString()
  gender: string;

  @IsString()
  @IsOptional()
  dob?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  email2?: string;
  @IsOptional()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  mobile_no?: string;

  @IsString()
  country_code: string;

  @IsString()
  whatsapp_no: string;

  @IsString()
  address: string;

  @IsOptional()
  city_id?: number;

  @IsOptional()
  state_id?: number;

  @IsOptional()
  country_id?: number;

  @IsString()
  pincode: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class ContactUsDto {
  @IsString()
  message: string;
  @IsEmail()
  email: string;
  @IsString()
  name: string;
}
