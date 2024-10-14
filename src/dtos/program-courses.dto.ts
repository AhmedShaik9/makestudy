// src/dtos/program-course.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class CreateProgramCourseDto {
  @IsString()
  programId: string;

  @IsString()
  courseName: string;

  @IsString()
  courseImage: string;

  @IsString()
  collageName: string;

  @IsString()
  courseDescription: string;

  @IsString()
  courseLength: string;

  @IsString()
  credentials: string;

  @IsString()
  availibleIntakes: string;

  @IsString()
  openIntakes: string;

  @IsString()
  applicationFee: string;

  @IsString()
  LOAdeposit: string;

  @IsString()
  annualTuitionFee: string;

  @IsString()
  commissionAmount: string;

  @IsString()
  commissionCurrency: string;

  @IsString()
  commissionType: string;

  @IsString()
  commissionInstallments: string;

  @IsString()
  published: string;

  @IsString()
  publishedDate: string;

  @IsString()
  seatConfirmationDeposit: string;

  @IsString()
  duration: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  courseDetails: string;

  @IsString()
  courseRequirements: string;

  @IsString()
  languageRequirements: string;

  @IsString()
  careerOpportunities: string;

  @IsString()
  courseHighlights: string;
}

export class UpdateProgramCourseDto {
  @IsString()
  programId: string;

  @IsString()
  @IsOptional()
  courseName?: string;

  @IsString()
  @IsOptional()
  courseImage?: string;

  @IsString()
  @IsOptional()
  collageName?: string;

  @IsString()
  @IsOptional()
  courseDescription?: string;

  @IsString()
  @IsOptional()
  courseLength?: string;

  @IsString()
  @IsOptional()
  credentials?: string;

  @IsString()
  @IsOptional()
  availibleIntakes?: string;

  @IsString()
  @IsOptional()
  openIntakes?: string;

  @IsString()
  @IsOptional()
  applicationFee?: string;

  @IsString()
  @IsOptional()
  LOAdeposit?: string;

  @IsString()
  @IsOptional()
  annualTuitionFee?: string;

  @IsString()
  @IsOptional()
  commissionAmount?: string;

  @IsString()
  @IsOptional()
  commissionCurrency?: string;

  @IsString()
  @IsOptional()
  commissionType?: string;

  @IsString()
  @IsOptional()
  commissionInstallments?: string;

  @IsString()
  @IsOptional()
  published?: string;

  @IsString()
  @IsOptional()
  publishedDate?: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  courseDetails: string;

  @IsString()
  courseRequirements: string;

  @IsString()
  languageRequirements: string;

  @IsString()
  careerOpportunities: string;

  @IsString()
  courseHighlights: string;
}
