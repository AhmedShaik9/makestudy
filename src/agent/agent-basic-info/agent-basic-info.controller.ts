import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AgentBasicInfoService } from './agent-basic-info.service';
import { AgentBasicInfo } from 'src/models/agent/agent-basic-info';
import { AgentBasicInfoDTO } from 'src/dtos/agent-basic-info.dto';

@Controller('agents')
export class AgentBasicInfoController {
  constructor(private readonly agentBasicInfoService: AgentBasicInfoService) {}

  // Create a new agent basic info
  @Post('create-agent-info')
  async create(
    @Body() agentBasicInfoDTO: AgentBasicInfoDTO,
  ): Promise<AgentBasicInfo> {
    return await this.agentBasicInfoService.create(agentBasicInfoDTO);
  }

  // Get all agent basic info records
  @Get('get-all-agent-info')
  async findAll(): Promise<AgentBasicInfo[]> {
    return await this.agentBasicInfoService.findAll();
  }

  // Get a single agent basic info record by ID
  @Get('get-agent-info/:id')
  async findOne(@Param('id') id: string): Promise<AgentBasicInfo> {
    return await this.agentBasicInfoService.findOne(id);
  }

  // Update an agent basic info record by ID
  @Put('edit-agent-info/:id')
  async update(
    @Param('id') id: string,
    @Body() agentBasicInfoDTO: AgentBasicInfoDTO,
  ): Promise<AgentBasicInfo> {
    return await this.agentBasicInfoService.update(id, agentBasicInfoDTO);
  }

  // Delete an agent basic info record by ID
  @Delete('delete-agent-info/:id')
  async delete(@Param('id') id: string): Promise<AgentBasicInfo> {
    return await this.agentBasicInfoService.delete(id);
  }
}
