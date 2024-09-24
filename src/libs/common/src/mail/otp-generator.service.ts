import { Injectable } from '@nestjs/common';
import * as otpGenerator from 'otp-generator';
@Injectable()
export class OtpGeneratorService {
  constructor() {}
  generateOtp() {
    const opt = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      Numbers: true,
    });
    return opt;
  }
}
