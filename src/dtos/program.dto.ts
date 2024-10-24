import { IsString } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  programName: string;

  @IsString()
  programCode: string;

  @IsString()
  programDescription: string;

  @IsString()
  programImage: string;
}

export class UpdateProgramDto {
  @IsString()
  programName?: string;

  @IsString()
  programCode?: string;

  @IsString()
  programDescription?: string;

  @IsString()
  programImage?: string;
}
