import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Program, ProgramSchema } from 'src/models/admin/programs.schema';
import { CommonModule } from 'src/libs/common/src';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Program.name, schema: ProgramSchema }]),
    CommonModule,
  ],
  providers: [ProgramService],
  controllers: [ProgramController],
})
export class ProgramModule {}
