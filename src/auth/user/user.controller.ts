import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto, UpdateUserDto } from '../../dtos/user.dto';
import { User } from '../../models/auth/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<User> {
    return this.userService.login(loginDto);
  }

  @Post('register')
  async initiateSignup(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.initiateSignup(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('verify-otp')
  async verifyOtpAndCreateUser(
    @Body() body: { otpCode: string; createUserDto: CreateUserDto },
  ) {
    const { otpCode, createUserDto } = body;
    try {
      return await this.userService.verifyOtpAndCreateUser(
        otpCode,
        createUserDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  // create passsword
  @Post('create-password')
  async createPassword(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return await this.userService.createPassword(email, password);
  }
  // reset password
  @Post('reset-password')
  async restPassword(@Body() body: { email: string }) {
    const { email } = body;
    return await this.userService.restPassword(email);
  }
  // verify otp and reset password
  @Post('verify-otp-and-reset-password')
  async verifyOtpAndResetPassword(
    @Body() body: { otpCode: string; email: string; password: string },
  ) {
    const { otpCode, email, password } = body;
    return await this.userService.verifyOtpAndResetPassword(
      otpCode,
      email,
      password,
    );
  }
}
