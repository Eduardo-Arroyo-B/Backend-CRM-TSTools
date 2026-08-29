import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServicesGlobalService } from './services_global.service';
import { CreateServicesGlobalDto } from './dto/create-services_global.dto';
import { UpdateServicesGlobalDto } from './dto/update-services_global.dto';

@Controller('services-global')
@UseGuards(AuthGuard('jwt'))
export class ServicesGlobalController {
  constructor(private readonly servicesGlobalService: ServicesGlobalService) {}

  @Post()
  create(@Body() createServicesGlobalDto: CreateServicesGlobalDto) {
    return this.servicesGlobalService.create(createServicesGlobalDto);
  }

  @Get()
  findAll() {
    return this.servicesGlobalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.servicesGlobalService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateServicesGlobalDto: UpdateServicesGlobalDto) {
    return this.servicesGlobalService.update(id, updateServicesGlobalDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.servicesGlobalService.remove(id);
  }
}
