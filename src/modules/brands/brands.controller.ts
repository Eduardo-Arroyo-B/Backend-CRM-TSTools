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
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CurrentUser } from '../../common/decorators/currentUser.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../../common/utils/requestWithUser.utils';

@UseGuards(AuthGuard('jwt'))
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateBrandDto,
    @CurrentUser() user: { id: string },
    @Req() req: RequestWithUser,
  ) {
    return this.brandsService.create(dto, user.id, req.user.tenantId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: RequestWithUser) {
    return this.brandsService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.brandsService.findOne(+id, req.user.tenantId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @Req() req: RequestWithUser,
  ) {
    return this.brandsService.update(+id, updateBrandDto, req.user.tenantId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.brandsService.remove(+id, req.user.tenantId);
  }
}
