import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ViewOn } from 'src/types/view-on';

export class CreateProgramDto {
  @IsString()
  programName: string;

  @IsString()
  programCode: string;

  @IsString()
  programDescription: string;

  @IsString()
  programImage: string;

  @IsOptional()
  @IsEnum(ViewOn)
  viewOn?: ViewOn[];
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

  @IsOptional()
  @IsEnum(ViewOn)
  viewOn?: ViewOn[];
}
