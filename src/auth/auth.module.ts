import { Module } from '@nestjs/common';
import { AdminauthService } from './admin-auth/adminauth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/models/auth/admin.schema';
import { AdminauthController } from './admin-auth/adminauth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './admin-auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User, UserSchema } from 'src/models/auth/user.schema';
import { RoleGuard } from 'src/guards/role.guard';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
  providers: [AdminauthService, JwtStrategy, UserService, RoleGuard],
})
export class AuthModule {}
