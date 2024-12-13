import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { MakeStudyOnlineService } from './make-study-online.service';
import { MakeStudyOnlineUser } from 'src/dtos/makestudy-online.dto';

@Controller('make-study-online')
export class MakeStudyOnlineController {
  constructor(
    private readonly makeStudyOnlineService: MakeStudyOnlineService,
  ) {}

  // Endpoint to initiate signup and send OTP
  @Post('signup')
  async initiateSignup(@Body() createUserDto: MakeStudyOnlineUser) {
    try {
      return await this.makeStudyOnlineService.initiateSignup(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Endpoint to verify OTP
  @Post('verify-otp')
  async verifyOtp(@Body() body: { otpCode: string; email: string }) {
    const { otpCode, email } = body;
    try {
      return await this.makeStudyOnlineService.verifyOtpAndCreateUser(
        otpCode,
        email,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Endpoint to create password for the user
  @Post('create-password')
  async createPassword(@Body() createUserDto: MakeStudyOnlineUser) {
    try {
      return await this.makeStudyOnlineService.createPassword(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
