import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
import { User } from 'src/models/auth/user.schema';
import { CreateUserDto, LoginDto, UpdateUserDto } from 'src/dtos/user.dto';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  private readonly saltRounds = 10;
  private accessTokenExpiresIn = 50;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { ...rest } = createUserDto;
    const hashedPassword = this.hashPassword(createUserDto.password);
    const createdUser = new this.userModel({
      ...rest,
      password: hashedPassword,
    });
    return createdUser.save();
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
    const payload = { email: user.email, sub: user._id };
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
}
