import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ModalsModule } from './models/models.module';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './admin/blogs/blogs.module';
import { CommonModule } from './libs/common/src';
import { ProgramCoursesModule } from './admin/program-courses/program-courses.module';
import { ProgramModule } from './admin/program/program.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ModalsModule,
    AuthModule,
    BlogsModule,
    CommonModule,
    ProgramCoursesModule,
    ProgramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
