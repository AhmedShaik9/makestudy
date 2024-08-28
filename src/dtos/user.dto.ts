import { IsString, IsEmail, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  readonly first_name: string;

  @IsString()
  readonly last_name: string;

  @IsString()
  readonly company: string;

  @IsString()
  @IsOptional()
  readonly user_code?: string;

  @IsString()
  readonly gender: string;

  @IsString()
  @IsOptional()
  readonly dob?: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly email2?: string;

  @IsString()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly mobile_no?: string;

  @IsString()
  readonly country_code: string;

  @IsString()
  readonly whatsapp_no: string;

  @IsString()
  readonly address: string;

  @IsOptional()
  readonly city_id?: number;

  @IsOptional()
  readonly state_id?: number;

  @IsOptional()
  readonly country_id?: number;

  @IsString()
  readonly pincode: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
