import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/auth/user/user.service';
import { MakeStudyOnlineUser } from 'src/dtos/makestudy-online.dto';
import { MailerService } from 'src/libs/common/src/mail/mailer.service';
import { OtpGeneratorService } from 'src/libs/common/src/mail/otp-generator.service';
import { OTP } from 'src/models/auth/otp.schema';
import { OnlineAuth } from 'src/models/make-study-online/auth.schmea';

@Injectable()
export class MakeStudyOnlineService {
  constructor(
    private jwtService: JwtService,
    private mailerService: MailerService,
    private otpGenerator: OtpGeneratorService,
    @InjectModel(OTP.name) private readonly otpModel: Model<OTP>,
    @InjectModel(OnlineAuth.name) private userModel: Model<OnlineAuth>,
    private userService: UserService,
  ) {}
  async initiateSignup(
    createUserDto: MakeStudyOnlineUser,
  ): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new ConflictException('User already exists');
    }
    const otp = this.otpGenerator.generateOtp();
    const subject = 'Welcome to Our Service!';
    const text = `Dear ${createUserDto.firstName},\n\nWelcome to our service! Your OTP is ${otp}.`;
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8gFHJGUqaBqmeXxBpdpGkqCMefNxTkwaVOg&s" alt="Welcome Image" style="width: 100%; max-width: 600px;">
          <h1>Welcome, ${createUserDto.firstName}!</h1>
          <p>We are excited to have you on board. Below is your OTP for account access:</p>
          <h2 style="color: #2E86C1;">${otp}</h2>
          <p>Make sure to use this OTP within the next  1 minute.</p>
          <p>Best Regards,<br/>The Team</p>
        `;

    await this.otpModel.create({
      otpCode: otp,
      createdAt: new Date(),
      userEmail: createUserDto.email,
      isUsed: false,
    });
    await this.mailerService.sendWelcomeEmail(
      createUserDto.email,
      subject,
      text,
      html,
    );
    return { message: 'OTP sent successfully' };
  }
  async verifyOtpAndCreateUser(
    otpCode: string,
    email: string,
  ): Promise<{ message: string }> {
    const otp = await this.otpModel.findOne({
      otpCode,
      userEmail: email,
      isUsed: false,
    });

    if (!otp) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    // Mark OTP as used
    otp.isUsed = true;
    await otp.save();
    return { message: 'otp verified' };
  }
  async createPassword(createUserDto: MakeStudyOnlineUser) {
    const checkValidUser = await this.otpModel
      .find()
      .where({ userEmail: createUserDto.email });
    if (checkValidUser.length > 0) {
      const hashedPassword = this.userService.hashPassword(
        createUserDto.password,
      );
      if (!createUserDto) {
        throw new BadRequestException('User data not found in cache');
      }
      createUserDto.password = hashedPassword;
      await this.userModel.create(createUserDto);

      return { message: 'Password updated successfully' };
    }

    throw new BadRequestException('User not validated');
  }
}
