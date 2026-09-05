import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizationGuard, RequirePermissions } from '../../common/auth/authorization.guard';
import { RequestWithUser } from '../../common/utils/requestWithUser.utils';
import { RolsService } from './rols.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Controller('rols')
@UseGuards(AuthGuard('jwt'), AuthorizationGuard)
@RequirePermissions('manage_roles')
export class RolsController {
  constructor(private readonly rolsService: RolsService) {}
  @Post() create(@Body() dto: CreateRolDto, @Req() req: RequestWithUser) { return this.rolsService.create(dto, req.user.tenantId); }
  @Get() findAll(@Req() req: RequestWithUser) { return this.rolsService.findAll(req.user.tenantId); }
  @Get(':id') findOne(@Param('id') id: string, @Req() req: RequestWithUser) { return this.rolsService.findOne(id, req.user.tenantId); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateRolDto, @Req() req: RequestWithUser) { return this.rolsService.update(id, dto, req.user.tenantId); }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) remove(@Param('id') id: string, @Req() req: RequestWithUser) { return this.rolsService.remove(id, req.user.tenantId); }
}
