import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { CreateProgramDto, UpdateProgramDto } from 'src/dtos/program.dto';
import { Program } from 'src/models/admin/programs.schema';

@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  async create(@Body() createProgramDto: CreateProgramDto): Promise<Program> {
    return this.programService.create(createProgramDto);
  }

  @Get()
  async findAll(): Promise<Program[]> {
    return this.programService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Program> {
    return this.programService.findOne(id);
  }
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string): Promise<Program> {
    return this.programService.getProgramBySlug(slug);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ): Promise<Program> {
    return this.programService.update(id, updateProgramDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.programService.remove(id);
  }
}
