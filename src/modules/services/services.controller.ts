import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestWithUser } from '../../common/utils/requestWithUser.utils';

@UseGuards(AuthGuard('jwt'))
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fieldSize: 5 * 1024 * 1024,
      },
    }),
  )
  create(
    @Body() dto: CreateServiceDto,
    @Req() req: RequestWithUser,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.servicesService.create(dto, req.user.tenantId, file);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.servicesService.findAll(req.user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.servicesService.findOne(+id, req.user.tenantId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceDto,
    @Req() req: RequestWithUser,
  ) {
    return this.servicesService.update(+id, dto, req.user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.servicesService.remove(+id, req.user.tenantId);
  }
}
