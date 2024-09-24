import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AgentBasicInfoDTO } from 'src/dtos/agent-basic-info.dto';
import { AgentBasicInfo } from 'src/models/agent/agent-basic-info';

@Injectable()
export class AgentBasicInfoService {
  constructor(
    @InjectModel(AgentBasicInfo.name)
    private readonly agentBasicInfoModel: Model<AgentBasicInfo>,
  ) {}

  // Create a new agent basic info
  async create(agentBasicInfoDTO: AgentBasicInfoDTO): Promise<AgentBasicInfo> {
    const newAgentInfo = new this.agentBasicInfoModel(agentBasicInfoDTO);
    return await newAgentInfo.save();
  }

  // Get all agent basic info records
  async findAll(): Promise<AgentBasicInfo[]> {
    return await this.agentBasicInfoModel.find().exec();
  }

  // Get a single agent basic info record by ID
  async findOne(id: string): Promise<AgentBasicInfo> {
    const agentInfo = await this.agentBasicInfoModel.findById(id).exec();
    if (!agentInfo) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }
    return agentInfo;
  }

  // Update an agent basic info record by ID
  async update(
    id: string,
    agentBasicInfoDTO: AgentBasicInfoDTO,
  ): Promise<AgentBasicInfo> {
    const updatedAgentInfo = await this.agentBasicInfoModel
      .findByIdAndUpdate(id, agentBasicInfoDTO, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedAgentInfo) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }
    return updatedAgentInfo;
  }

  // Delete an agent basic info record by ID
  async delete(id: string): Promise<AgentBasicInfo> {
    const deletedAgentInfo = await this.agentBasicInfoModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedAgentInfo) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }
    return deletedAgentInfo;
  }
}
