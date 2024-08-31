import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './auth/admin.schema';
import { User, UserSchema } from './auth/user.schema';
import { OTP, OTPSchema } from './auth/otp.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: OTP.name, schema: OTPSchema }]),
  ],
  exports: [],
  providers: [],
})
export class ModalsModule {}
