import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Program, ProgramSchema } from 'src/models/admin/programs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Program.name, schema: ProgramSchema }]),
  ],
  providers: [ProgramService],
  controllers: [ProgramController],
})
export class ProgramModule {}
