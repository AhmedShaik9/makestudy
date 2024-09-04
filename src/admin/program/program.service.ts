import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProgramDto, UpdateProgramDto } from 'src/dtos/program.dto';
import { Program } from 'src/models/admin/programs.schema';

@Injectable()
export class ProgramService {
  constructor(
    @InjectModel(Program.name) private programModel: Model<Program>,
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    const newProgram = new this.programModel(createProgramDto);
    return newProgram.save();
  }

  async findAll(): Promise<Program[]> {
    return this.programModel.find().exec();
  }

  async findOne(id: string): Promise<Program> {
    const program = await this.programModel.findById(id).exec();
    if (!program) {
      throw new NotFoundException(`Program with id ${id} not found`);
    }
    return program;
  }

  async update(
    id: string,
    updateProgramDto: UpdateProgramDto,
  ): Promise<Program> {
    const program = await this.programModel
      .findByIdAndUpdate(id, updateProgramDto, { new: true })
      .exec();
    if (!program) {
      throw new NotFoundException(`Program with id ${id} not found`);
    }
    return program;
  }

  async remove(id: string): Promise<void> {
    const result = await this.programModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Program with id ${id} not found`);
    }
  }
}
