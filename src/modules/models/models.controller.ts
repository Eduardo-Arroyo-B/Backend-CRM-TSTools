import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { RequestWithUser } from '../../common/utils/requestWithUser.utils';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateModelDto, @Req() req: RequestWithUser) {
    return this.modelsService.create(dto, req.user.id, req.user.tenantId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: RequestWithUser) {
    return this.modelsService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.modelsService.findOne(+id, req.user.tenantId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateModelDto: UpdateModelDto,
    @Req() req: RequestWithUser,
  ) {
    return this.modelsService.update(+id, updateModelDto, req.user.tenantId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.modelsService.remove(+id, req.user.tenantId);
  }
}
