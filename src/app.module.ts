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
import { SlugService } from './libs/common/src/slug/slug.service';
import { AgentModule } from './agent/agent.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      ttl: 120000,
      max: 100,
      isGlobal: true,
    }),
    DatabaseModule,
    ModalsModule,
    AuthModule,
    BlogsModule,
    CommonModule,
    ProgramCoursesModule,
    ProgramModule,
    AgentModule,
  ],
  controllers: [AppController],
  providers: [AppService, SlugService],
})
export class AppModule {}
