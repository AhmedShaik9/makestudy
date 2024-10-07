import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from 'src/dtos/create-student.dto';
import { StudentInfo } from 'src/models/agent/student-info';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<StudentInfo> {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  async findAll(): Promise<StudentInfo[]> {
    return this.studentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StudentInfo> {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: CreateStudentDto,
  ): Promise<StudentInfo> {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<StudentInfo> {
    return this.studentsService.remove(id);
  }
}
