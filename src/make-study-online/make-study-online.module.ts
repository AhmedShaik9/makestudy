import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OnlineAuth,
  OnlineAuthSchema,
} from 'src/models/make-study-online/auth.schmea';
import { MakeStudyOnlineController } from './make-study-online.controller';
import { MakeStudyOnlineService } from './make-study-online.service';
import { OtpGeneratorService } from 'src/libs/common/src/mail/otp-generator.service';
import { MailerService } from 'src/libs/common/src/mail/mailer.service';
import { OTP, OTPSchema } from 'src/models/auth/otp.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from 'src/models/auth/user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OnlineAuth.name, schema: OnlineAuthSchema },
    ]),
    MongooseModule.forFeature([{ name: OTP.name, schema: OTPSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    AuthModule,
  ],
  controllers: [MakeStudyOnlineController],
  providers: [MakeStudyOnlineService, MailerService, OtpGeneratorService],
})
export class MakeStudyOnlineModule {}
