import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../../models/auth/admin.schema';
import { CreateAdminDto, UpdateAdminDto } from '../../dtos/admin.dto';
import { JwtService } from '@nestjs/jwt';
// import crypto from 'crypto';
import * as crypto from 'crypto';

@Injectable()
export class AdminauthService {
  private readonly saltRounds = 10;
  private accessTokenExpiresIn = 50;
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private jwtService: JwtService,
  ) {}

  // Get all admins data
  async findAll(): Promise<Admin[]> {
    return await this.adminModel.find({});
  }
  // get by admin id
  async findById(id: string): Promise<Admin | null> {
    return await this.adminModel.findById(id);
  }
  // Create a new admin
  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const hashedPassword = this.hashPassword(createAdminDto.password);
    const newAdmin = new this.adminModel({
      ...createAdminDto,
      password: hashedPassword,
    });
    return await newAdmin.save();
  }

  hashPassword(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
  }
  // Edit an existing admin
  async update(
    id: string,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin | null> {
    if (updateAdminDto.password) {
      updateAdminDto.password = await this.hashPassword(
        updateAdminDto.password,
      );
    }
    return await this.adminModel
      .findByIdAndUpdate(id, updateAdminDto, { new: true })
      .exec();
  }

  // Delete an admin
  async delete(id: string): Promise<Admin | null> {
    return await this.adminModel.findByIdAndDelete(id);
  }
  //   login and refresh token

  //   function(plainPassword) {
  //     const hashedPassword = crypto
  //       .createHash('md5')
  //       .update(plainPassword)
  //       .digest('hex');
  //     return this.password === hashedPassword;
  //   }
  //   async login(username: string, password: string) {
  //     const admin = await this.adminModel.findOne({ username });
  //     if (admin && (await bcrypt.compare(password, admin.password))) {
  //       const payload = { username: admin.username, sub: admin._id };
  //       const expirationDate = new Date();
  //       expirationDate.setMinutes(
  //         expirationDate.getMinutes() + this.accessTokenExpiresIn,
  //       );
  //       const expiresIn = expirationDate.toISOString();
  //       return {
  //         accessToken: this.jwtService.sign(payload),
  //         refreshToken: this.jwtService.sign(payload, { expiresIn: '1d' }), //change expiration in the end
  //         expiresIn: expiresIn,
  //       };
  //     }
  //     return null;
  //   }

  async login(username: string, password: string) {
    const admin = await this.adminModel.findOne({ username });
    if (admin && this.validatePassword(password, admin.password)) {
      const payload = {
        username: admin.username,
        sub: admin._id,
        role: admin.type,
      };
      const expirationDate = new Date();
      expirationDate.setMinutes(
        expirationDate.getMinutes() + this.accessTokenExpiresIn,
      );
      const expiresIn = expirationDate.toISOString();

      return {
        accessToken: this.jwtService.sign(payload,{expiresIn:'1d'}),
        refreshToken: this.jwtService.sign(payload, { expiresIn: '1d' }),
        expiresIn: expiresIn,
      };
    }
    return null;
  }

  validatePassword(plainPassword: string, hashedPassword: string): boolean {
    const hashedPlainPassword = crypto
      .createHash('md5')
      .update(plainPassword)
      .digest('hex');
    return hashedPassword === hashedPlainPassword;
  }

  async refreshToken(oldToken: string) {
    try {
      const payload = this.jwtService.verify(oldToken);
      const newPayload = { username: payload.username, sub: payload.sub };
      return {
        accessToken: this.jwtService.sign(newPayload),
        refreshToken: this.jwtService.sign(newPayload, { expiresIn: '1d' }),
      };
    } catch (error) {
      return error;
    }
  }
}
// give me sum of 2+2 in python
