import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
import { User } from '../../models/auth/user.schema';
import { CreateUserDto, LoginDto, UpdateUserDto } from '../../dtos/user.dto';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '../../libs/common/src/mail/mailer.service';
import { OtpGeneratorService } from '../../libs/common/src/mail/otp-generator.service';
import { OTP } from '../../models/auth/otp.schema';
// import { Admin } from 'src/models/auth/admin.schema';
import { Admin } from '../../models/auth/admin.schema';
@Injectable()
export class UserService {
  private readonly saltRounds = 10;
  private accessTokenExpiresIn = 50;
  private userCache = new Map<string, CreateUserDto>();

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private otpGenerator: OtpGeneratorService,
    @InjectModel(OTP.name) private readonly otpModel: Model<OTP>,
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
  ) {}
  async initiateSignup(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new ConflictException('User already exists');
    }
    const otp = this.otpGenerator.generateOtp();
    const subject = 'Welcome to Our Service!';
    const text = `Dear ${createUserDto.first_name},\n\nWelcome to our service! Your OTP is ${otp}.`;
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8gFHJGUqaBqmeXxBpdpGkqCMefNxTkwaVOg&s" alt="Welcome Image" style="width: 100%; max-width: 600px;">
          <h1>Welcome, ${createUserDto.first_name}!</h1>
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
    this.userCache.set(createUserDto.email, createUserDto);
    setTimeout(() => this.userCache.delete(createUserDto.email), 90000);

    return { message: 'OTP sent successfully' };
  }

  // async verifyOtpAndCreateUser(otpCode: string, createUserDto: CreateUserDto) {
  //   console.log(createUserDto);
  //   try {
  //     const otp = await this.otpModel.findOne({
  //       otpCode,
  //       userEmail: createUserDto.email,
  //       isUsed: false,
  //     });
  //     // console.log(createUserDto);
  //     if (!otp) {
  //       throw new BadRequestException('Invalid or expired OTP');
  //     }

  //     // Mark OTP as used
  //     otp.isUsed = true;
  //     otp.validated = true;
  //     await otp.save();

  //     // Hash the password and save the user
  //     // const hashedPassword = this.hashPassword(createUserDto.password);
  //     const createdUser = new this.userModel({
  //       ...createUserDto,
  //     });

  //     await createdUser.save();
  //     return { message: 'User created successfully' };
  //   } catch (err) {
  //     console.log(err);
  //     throw new BadRequestException('Invalid or expired OTP');
  //   }
  // }

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

    // Retrieve user data from cache
    const createUserDto = this.userCache.get(email);
    if (!createUserDto) {
      throw new BadRequestException('User data not found');
    }

    // Create the user
    const createdUser = new this.userModel({ ...createUserDto });
    await createdUser.save();

    // Clear cached user data
    this.userCache.delete(email);
    return { message: 'User created successfully' };
  }

  hashPassword(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
  }
  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
  async createPassword(email: string, password: string) {
    // const user = await this.userModel.findOne({ email: email });
    const user = await this.userModel.findOne({}).where({ email: email });
    // console.log(email, password);
    console.log(user);
    // Check if user exists
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const checkValidUser = await this.otpModel
      .find()
      .where({ userEmail: user.email });
    console.log(checkValidUser);
    if (checkValidUser.length > 0 && checkValidUser[0].validated) {
      const hashedPassword = this.hashPassword(password);
      await this.userModel
        .findByIdAndUpdate(user.id, { password: hashedPassword })
        .exec();
      return { message: 'Password updated successfully' };
    }

    throw new BadRequestException('User not validated');
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = this.validatePassword(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id, role: user.usertype };
    const expirationDate = new Date();
    expirationDate.setMinutes(
      expirationDate.getMinutes() + this.accessTokenExpiresIn,
    );
    const expiresIn = expirationDate.toISOString();

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '1d' }),
      expiresIn: expiresIn,
    };
  }
  validatePassword(plainPassword: string, hashedPassword: string): boolean {
    const hashedPlainPassword = crypto
      .createHash('md5')
      .update(plainPassword)
      .digest('hex');
    return hashedPassword === hashedPlainPassword;
  }
  async validateOtp(userEmail: string, otpCode: string): Promise<boolean> {
    const otp = await this.otpModel.findOne({
      userEmail,
      otpCode,
      isUsed: false,
    });
    if (!otp) {
      return false;
    }
    otp.isUsed = true;
    await otp.save();
    return true;
  }
  async restPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const otp = this.otpGenerator.generateOtp();
    const subject = 'Password Reset';
    const text = `Dear ${user.first_name},\n\nYour OTP for password reset is ${otp}.`;
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8gFHJGUqaBqmeXxBpdpGkqCMefNxTkwaVOg&s" alt="Welcome Image" style="width: 100%; max-width: 600px;">
          <h1>Dear ${user.first_name},</h1>
          <p>We have received a request to reset your password. Below is your OTP for password reset:</p>
          <h2 style="color: #2E86C1;">${otp}</h2>
          <p>Make sure to use this OTP within the next 1 minute.</p>
          <p>Best Regards,<br/>The Team</p>
        `;

    await this.otpModel.create({
      otpCode: otp,
      createdAt: new Date(),
      userEmail: email,
      isUsed: false,
    });
    await this.mailerService.sendWelcomeEmail(email, subject, text, html);
    return { message: 'OTP sent successfully' };
  }
  async verifyOtpAndResetPassword(
    otpCode: string,
    email: string,
    password: string,
  ) {
    const otp = await this.otpModel.findOne({
      otpCode,
      userEmail: email,
      isUsed: false,
    });
    if (!otp) {
      throw new BadRequestException('Invalid or expired OTP');
    }
    otp.isUsed = true;
    await otp.save();
    const hashedPassword = this.hashPassword(password);
    await this.userModel
      .findOneAndUpdate({ email }, { password: hashedPassword })
      .exec();
    return { message: 'Password reset successfully' };
  }
}
