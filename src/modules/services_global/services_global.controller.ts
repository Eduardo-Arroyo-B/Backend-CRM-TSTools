import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  AuthorizationGuard,
  RequireRoleTypes,
} from '../../common/auth/authorization.guard';
import { ServicesGlobalService } from './services_global.service';
import { CreateServicesGlobalDto } from './dto/create-services_global.dto';
import { UpdateServicesGlobalDto } from './dto/update-services_global.dto';

@Controller('services-global')
@UseGuards(AuthGuard('jwt'), AuthorizationGuard)
export class ServicesGlobalController {
  constructor(private readonly servicesGlobalService: ServicesGlobalService) {}

  @Post()
  @RequireRoleTypes('SADMIN')
  create(@Body() createServicesGlobalDto: CreateServicesGlobalDto) {
    return this.servicesGlobalService.create(createServicesGlobalDto);
  }

  @Get()
  @RequireRoleTypes('SADMIN', 'ADMIN', 'USUARIO')
  findAll() {
    return this.servicesGlobalService.findAll();
  }

  @Get(':id')
  @RequireRoleTypes('SADMIN', 'ADMIN', 'USUARIO')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.servicesGlobalService.findOne(id);
  }

  @Patch(':id')
  @RequireRoleTypes('SADMIN')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServicesGlobalDto: UpdateServicesGlobalDto,
  ) {
    return this.servicesGlobalService.update(id, updateServicesGlobalDto);
  }

  @Delete(':id')
  @RequireRoleTypes('SADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.servicesGlobalService.remove(id);
  }
}
