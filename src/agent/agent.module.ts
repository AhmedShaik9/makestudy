import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AgentBasicInfo,
  AgentBasicInfoSchema,
} from 'src/models/agent/agent-basic-info';
import { AgentBasicInfoController } from './agent-basic-info/agent-basic-info.controller';
import { AgentBasicInfoService } from './agent-basic-info/agent-basic-info.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AgentBasicInfo.name, schema: AgentBasicInfoSchema },
    ]),
  ],
  controllers: [AgentBasicInfoController],
  providers: [AgentBasicInfoService],
})
export class AgentModule {}
