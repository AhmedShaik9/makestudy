import { Module } from '@nestjs/common';
import { ProgramCourseService } from './program-course.service';
import { ProgramCourseController } from './program-course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProgramCourse,
  ProgramCourseSchema,
} from 'src/models/admin/program-course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProgramCourse.name, schema: ProgramCourseSchema },
    ]),
  ],
  providers: [ProgramCourseService],
  controllers: [ProgramCourseController],
})
export class ProgramCoursesModule {}
