// src/program-course/program-course.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { ProgramCourseService } from './program-course.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Types } from 'mongoose';
import {
  CreateProgramCourseDto,
  UpdateProgramCourseDto,
} from 'src/dtos/program-courses.dto';

@Controller('program-courses')
export class ProgramCourseController {
  constructor(private readonly programCourseService: ProgramCourseService) {}
  baseUrl = 'https://api.partners.makestudy.com:8443/uploads/program-course/';
  // baseUrl = 'http://localhost:8080/uploads/program-course/';
  @Get('test')
  async test(@Query() filters?: any) {
    return await this.programCourseService.getAllData(filters || {});
  }
  @Get()
  async getAllProgramCourses(
    @Res() res: Response,
    @Query('skip') skip: number,
    @Query('limit') limit: number,
  ) {
    try {
      const programCourses =
        await this.programCourseService.getAllProgramCourses(skip, limit);
      const programCoursesWithUrls = programCourses.map((programCourse) => ({
        ...programCourse, // toObject removes Mongoose metadata
        courseImage: this.baseUrl + programCourse.courseImage,
      }));
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'ProgramCourses fetched successfully',
        data: programCoursesWithUrls,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch program courses',
        error: error.message,
      });
    }
  }
  @Get('admin')
  async getAllProgramCoursesAdmin(
    @Res() res: Response,
    @Query('skip') skip: number,
    @Query('limit') limit: number,
  ) {
    try {
      const programCourses =
        await this.programCourseService.getAllProgramCoursesAdmin(skip, limit);
      const programCoursesWithUrls = programCourses.map((programCourse) => ({
        ...programCourse, // toObject removes Mongoose metadata
        courseImage: this.baseUrl + programCourse.courseImage,
      }));
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'ProgramCourses fetched successfully',
        data: programCoursesWithUrls,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch program courses',
        error: error.message,
      });
    }
  }

  @Get(':id')
  async getProgramCourseById(@Param('id') id: string, @Res() res: Response) {
    try {
      const programCourse =
        await this.programCourseService.getProgramCourseById(
          new Types.ObjectId(id),
        );
      if (!programCourse) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'ProgramCourse not found',
        });
      }
      const programCourseWithUrl = {
        ...programCourse,
        courseImage: this.baseUrl + programCourse.courseImage,
      };
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'ProgramCourse fetched successfully',
        data: programCourseWithUrl,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch program course',
        error: error.message,
      });
    }
  }

  @Get(':slug')
  async getProgramCourseBySlug(
    @Param('slug') slug: string,
    @Res() res: Response,
  ) {
    try {
      const programCourse =
        await this.programCourseService.getProgramCourseBySlug(slug);
      if (!programCourse) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'ProgramCourse not found',
        });
      }
      const programCourseWithUrl = {
        ...programCourse,
        courseImage: this.baseUrl + programCourse.courseImage,
      };
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'ProgramCourse fetched successfully',
        data: programCourseWithUrl,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch program course',
        error: error.message,
      });
    }
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: 'uploads/program-course',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async createProgramCourse(
    @Body() createProgramCourseDto: CreateProgramCourseDto,
    @Res() res: Response,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      createProgramCourseDto.courseImage = files[0].filename;
      const createdProgramCourse =
        await this.programCourseService.createProgramCourse(
          createProgramCourseDto,
        );
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'ProgramCourse created successfully',
        data: createdProgramCourse,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create program course',
        error: error,
      });
    }
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: diskStorage({
        destination: 'uploads/program-course',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async updateProgramCourse(
    @Param('id') id: string,
    @Body() updateProgramCourseDto: UpdateProgramCourseDto,
    @Res() res: Response,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    delete updateProgramCourseDto.courseImage;
    try {
      if (files && files.length > 0) {
        updateProgramCourseDto.courseImage = files[0].filename;
      }
      const updatedProgramCourse =
        await this.programCourseService.updateProgramCourse(
          new Types.ObjectId(id),
          updateProgramCourseDto,
        );
      if (!updatedProgramCourse) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'ProgramCourse not found',
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'ProgramCourse updated successfully',
        data: updatedProgramCourse,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to update program course',
        error: error.message,
      });
    }
  }

  @Delete(':id')
  async deleteProgramCourse(@Param('id') id: string, @Res() res: Response) {
    try {
      const deletedProgramCourse =
        await this.programCourseService.deleteProgramCourse(
          new Types.ObjectId(id),
        );
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'ProgramCourse deleted successfully',
        data: deletedProgramCourse,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to delete program course',
        error: error.message,
      });
    }
  }
}
