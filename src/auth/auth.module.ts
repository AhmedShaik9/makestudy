import { Module } from '@nestjs/common';
import { AdminauthService } from './admin-auth/adminauth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from '.././models/auth/admin.schema';
import { AdminauthController } from './admin-auth/adminauth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './admin-auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User, UserSchema } from '../models/auth/user.schema';
import { RoleGuard } from '../guards/role.guard';
import { MailerService } from './mail/mailer.service';
import { OTP, OTPSchema } from '../models/auth/otp.schema';
import { OtpGeneratorService } from './mail/otp-generator.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: OTP.name, schema: OTPSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AdminauthController, UserController],
  providers: [
    AdminauthService,
    JwtStrategy,
    UserService,
    RoleGuard,
    MailerService,
    OtpGeneratorService,
  ],
})
export class AuthModule {}
