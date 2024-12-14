import { IsEmail, IsString } from 'class-validator';

export class MakeStudyOnlineUser {
  @IsEmail()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  password: string;
  @IsString()
  phoneNumber: string;
  @IsString()
  nationality: string;
}
