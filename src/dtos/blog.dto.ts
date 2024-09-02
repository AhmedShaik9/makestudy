import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  featured_image: string;

  @IsString()
  @IsOptional()
  thumb_image: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  added_date?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  updated_date?: Date;

  @IsEnum(['Y', 'N'])
  @IsOptional()
  is_published?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  publish_date?: Date;

  @IsEnum(['Y', 'N'])
  @IsOptional()
  is_deleted?: string;
}
