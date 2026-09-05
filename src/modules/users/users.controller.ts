import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizationGuard, RequirePermissions } from '../../common/auth/authorization.guard';
import { RequestWithUser } from '../../common/utils/requestWithUser.utils';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'), AuthorizationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post() @RequirePermissions('create_users') create(@Body() dto: CreateUserDto, @Req() req: RequestWithUser) { return this.usersService.create(dto, req.user.tenantId); }
  @Get() @RequirePermissions('view_users') findAll(@Req() req: RequestWithUser) { return this.usersService.findAll(req.user.tenantId); }
  @Get(':id') @RequirePermissions('view_users') findOne(@Param('id') id: string, @Req() req: RequestWithUser) { return this.usersService.findOne(id, req.user.tenantId); }
  @Patch(':id') @RequirePermissions('edit_users') update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Req() req: RequestWithUser) { return this.usersService.update(id, dto, req.user.tenantId); }
  @Delete(':id') @RequirePermissions('delete_users') @HttpCode(HttpStatus.NO_CONTENT) remove(@Param('id') id: string, @Req() req: RequestWithUser) { return this.usersService.remove(id, req.user.tenantId); }
}
