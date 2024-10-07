import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AgentBasicInfo,
  AgentBasicInfoSchema,
} from 'src/models/agent/agent-basic-info';
import { AgentBasicInfoController } from './agent-basic-info/agent-basic-info.controller';
import { AgentBasicInfoService } from './agent-basic-info/agent-basic-info.service';
import { StudentsService } from './students/students.service';
import { StudentsController } from './students/students.controller';
import { StudentInfoSchema } from 'src/models/agent/student-info';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AgentBasicInfo.name, schema: AgentBasicInfoSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'StudentInfo', schema: StudentInfoSchema },
    ]),
  ],
  controllers: [AgentBasicInfoController, StudentsController],
  providers: [AgentBasicInfoService, StudentsService],
})
export class AgentModule {}
