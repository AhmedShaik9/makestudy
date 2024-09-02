import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminauthService } from './adminauth.service';
import { CreateAdminDto, UpdateAdminDto } from '../../dtos/admin.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Request } from 'express';
import { RoleGuard } from '../../guards/role.guard';
@Controller('admin-auth')
export class AdminauthController {
  constructor(private readonly adminService: AdminauthService) {}

  // Get all admins
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  async findAll() {
    return await this.adminService.findAll();
  }
  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  async findOne(@Param('id') id: string) {
    return await this.adminService.findById(id);
  }
  // Create a new admin
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    return await this.adminService.create(createAdminDto);
  }

  // Update an existing admin
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return await this.adminService.update(id, updateAdminDto);
  }

  // Delete an admin
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.adminService.delete(id);
  }

  //   login and refresh token

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Req() req: Request,
  ) {
    console.log(body);
    const result = await this.adminService.login(body.username, body.password);
    if (result) {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      return { result: result, ip: ip };
    }
    return 'Invalid credentials';
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Body() body: { refreshToken: string }) {
    return await this.adminService.refreshToken(body.refreshToken);
  }
}
