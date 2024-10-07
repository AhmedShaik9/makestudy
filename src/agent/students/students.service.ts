import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from 'src/dtos/create-student.dto';
import {
  StudentInfo,
  StudentInfoDocument,
} from 'src/models/agent/student-info';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(StudentInfo.name)
    private studentModel: Model<StudentInfoDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentInfo> {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  async findAll(): Promise<StudentInfo[]> {
    return this.studentModel.find().exec();
  }

  async findOne(id: string): Promise<StudentInfo> {
    return this.studentModel.findById(id).exec();
  }

  async update(
    id: string,
    updateStudentDto: CreateStudentDto,
  ): Promise<StudentInfo> {
    return this.studentModel
      .findByIdAndUpdate(id, updateStudentDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<StudentInfo> {
    return this.studentModel.findByIdAndDelete(id).exec();
  }
}
