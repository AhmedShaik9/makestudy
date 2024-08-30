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
import { CreateAdminDto, UpdateAdminDto } from 'src/dtos/admin.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request } from 'express';
import { RoleGuard } from 'src/guards/role.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorators';
@Controller('admin-auth')
@UseGuards(RolesGuard)
export class AdminauthController {
  constructor(private readonly adminService: AdminauthService) {}

  // Get all admins
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  @Roles('admin') // <-- Moved this outside of the method
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
