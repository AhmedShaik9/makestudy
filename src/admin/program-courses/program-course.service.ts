// src/program-course/program-course.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { promises as fs } from 'fs';
import { join } from 'path';
import { ProgramCourse } from 'src/models/admin/program-course.schema';
import {
  CreateProgramCourseDto,
  UpdateProgramCourseDto,
} from 'src/dtos/program-courses.dto';

@Injectable()
export class ProgramCourseService {
  constructor(
    @InjectModel(ProgramCourse.name)
    private programCourseModel: Model<ProgramCourse>,
  ) {}

  async createProgramCourse(
    createProgramCourseDto: CreateProgramCourseDto,
  ): Promise<ProgramCourse> {
    return this.programCourseModel.create(createProgramCourseDto);
  }

  async getAllProgramCourses(
    skip: number,
    limit: number,
  ): Promise<ProgramCourse[]> {
    return this.programCourseModel.find().skip(skip).limit(limit).exec();
  }

  async getProgramCourseById(id: Types.ObjectId): Promise<ProgramCourse> {
    const programCourse = await this.programCourseModel.findById(id).exec();
    if (!programCourse) {
      throw new NotFoundException(`ProgramCourse with id ${id} not found`);
    }
    return programCourse;
  }

  async updateProgramCourse(
    id: Types.ObjectId,
    updateProgramCourseDto: UpdateProgramCourseDto,
  ): Promise<ProgramCourse> {
    const updatedProgramCourse = await this.programCourseModel
      .findByIdAndUpdate(id, updateProgramCourseDto, { new: true })
      .exec();
    if (!updatedProgramCourse) {
      throw new NotFoundException(`ProgramCourse with id ${id} not found`);
    }
    return updatedProgramCourse;
  }

  async deleteProgramCourse(id: Types.ObjectId): Promise<ProgramCourse> {
    const programCourse = await this.programCourseModel.findById(id).exec();
    if (!programCourse) {
      throw new NotFoundException(`ProgramCourse with id ${id} not found`);
    }

    // Delete the associated image
    const courseImagePath = join(
      __dirname,
      '..',
      '..',
      'uploads',
      'program-course',
      programCourse.courseImage,
    );

    try {
      await fs.unlink(courseImagePath);
      console.log('Image deleted successfully', courseImagePath);
    } catch (error) {
      console.error('Error deleting image:', error);
      // Log the error but continue with the deletion of the program course
    }

    return this.programCourseModel.findByIdAndDelete(id).exec();
  }
}