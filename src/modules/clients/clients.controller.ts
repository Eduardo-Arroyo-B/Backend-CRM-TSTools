import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { RequestWithUser } from '../../common/utils/requestWithUser.utils';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizationGuard, RequirePermissions } from '../../common/auth/authorization.guard';

@UseGuards(AuthGuard('jwt'), AuthorizationGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @RequirePermissions('create_clients')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateClientDto, @Req() req: RequestWithUser) {
    return this.clientsService.create(dto, req.user.id, req.user.tenantId);
  }

  @Get()
  @RequirePermissions('view_clients')
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: RequestWithUser) {
    return this.clientsService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @RequirePermissions('view_clients')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    return this.clientsService.findOne(id, req.user.tenantId);
  }

  @Patch(':id')
  @RequirePermissions('edit_clients')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
    @Req() req: RequestWithUser,
  ) {
    return this.clientsService.update(id, updateClientDto, req.user.tenantId);
  }

  @Delete(':id')
  @RequirePermissions('delete_clients')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    return this.clientsService.remove(id, req.user.tenantId);
  }
}
