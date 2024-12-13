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
import { MailerService } from '../libs/common/src/mail/mailer.service';
import { OTP, OTPSchema } from '../models/auth/otp.schema';
import { OtpGeneratorService } from '../libs/common/src/mail/otp-generator.service';
import { AgentBasicInfoSchema } from 'src/models/agent/agent-basic-info';
// import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: OTP.name, schema: OTPSchema }]),
    MongooseModule.forFeature([
      { name: 'AgentBasicInfo', schema: AgentBasicInfoSchema },
    ]),
    // CacheModule.register(),
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
  exports: [AdminauthService, JwtStrategy, RoleGuard, UserService],
})
export class AuthModule {}
