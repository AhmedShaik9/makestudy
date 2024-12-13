import { IsEmail, IsString } from 'class-validator';

export class MakeStudyOnlineUser {
  @IsEmail()
  email: string;
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsString()
  password: string;
  @IsString()
  mobileNumber: string;
  @IsString()
  nationality: string;
}
