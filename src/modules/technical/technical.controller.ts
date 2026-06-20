import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Req,
  HttpCode,
} from '@nestjs/common';
import { TechnicalService } from './technical.service';
import { CreateTechnicalDto } from './dto/create-technical.dto';
import { UpdateTechnicalDto } from './dto/update-technical.dto';
import { RequestWithUser } from '../../common/utils/requestWithUser.utils';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('technical')
export class TechnicalController {
  constructor(private readonly technicalService: TechnicalService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createTechnicalDto: CreateTechnicalDto,
    @Req() req: RequestWithUser,
  ) {
    return this.technicalService.create(
      createTechnicalDto,
      req.user.id,
      req.user.tenantId,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: RequestWithUser) {
    return this.technicalService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.technicalService.findOne(+id, req.user.tenantId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateTechnicalDto: UpdateTechnicalDto,
    @Req() req: RequestWithUser,
  ) {
    return this.technicalService.update(
      +id,
      updateTechnicalDto,
      req.user.tenantId,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.technicalService.remove(+id, req.user.tenantId);
  }
}
