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
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PayOrderDto } from './dto/PayOrder.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { createCommentDto } from './dto/create-comment.dto';
import { createObservationDto } from './dto/create-observation.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { RequestWithUser } from '../../common/utils/requestWithUser.utils';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  AuthorizationGuard,
  RequirePermissions,
} from '../../common/auth/authorization.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @RequirePermissions('create_orders')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateOrderDto, @Req() req: RequestWithUser) {
    return this.ordersService.create(dto, req.user.id, req.user.tenantId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @RequirePermissions('view_orders')
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: RequestWithUser) {
    return this.ordersService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @RequirePermissions('view_orders')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.ordersService.findOne(+id, req.user.tenantId);
  }

  @Get('tracking/:id')
  async tracking(@Param('id') id: string, @Query('token') token: string) {
    return this.ordersService.findTracking(+id, token);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @RequirePermissions('edit_orders')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() req: RequestWithUser,
  ) {
    return this.ordersService.update(+id, updateOrderDto, req.user.tenantId);
  }

  @Patch('status/:id')
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @RequirePermissions('edit_orders')
  @HttpCode(HttpStatus.OK)
  updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @Req() req: RequestWithUser,
  ) {
    return this.ordersService.updateStatus(
      +id,
      updateOrderStatusDto,
      req.user.tenantId,
    );
  }

  @Patch('statusReturn/:id')
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @RequirePermissions('edit_orders')
  @HttpCode(HttpStatus.OK)
  updateStatusReturn(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.ordersService.updateStatusReturn(+id, req.user.tenantId);
  }

  @Patch('comments/:id')
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @RequirePermissions('edit_orders')
  @HttpCode(HttpStatus.OK)
  updateComments(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: RequestWithUser,
  ) {
    return this.ordersService.updateComments(
      +id,
      updateCommentDto,
      req.user.tenantId,
    );
  }

  @Post('createComments/:id')
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @RequirePermissions('edit_orders')
  @HttpCode(HttpStatus.OK)
  createComment(
    @Param('id') id: string,
    @Body() createCommentDto: createCommentDto,
  ) {
    return this.ordersService.createComment(+id, createCommentDto);
  }

  @Post('createObservation/:id')
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @RequirePermissions('edit_orders')
  @HttpCode(HttpStatus.OK)
  createObservation(
    @Param('id') id: string,
    @Body() createObservationDto: createObservationDto,
  ) {
    return this.ordersService.createObservations(+id, createObservationDto);
  }

  @Patch('finalizar/:id')
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @RequirePermissions('edit_orders')
  @HttpCode(HttpStatus.OK)
  findTecnico(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.ordersService.finalizar(+id, req.user.tenantId);
  }

  @Post('pagarOrden/:id')
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @RequirePermissions('edit_orders')
  @HttpCode(HttpStatus.OK)
  pagarOrden(
    @Param('id') id: string,
    @Body() pagarDto: PayOrderDto,
    @Req() req: RequestWithUser,
  ) {
    return this.ordersService.pagarOrden(+id, pagarDto, req.user.tenantId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
  @RequirePermissions('delete_orders')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.ordersService.remove(+id, req.user.tenantId);
  }
}
