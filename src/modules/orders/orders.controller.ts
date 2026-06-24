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
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { RequestWithUser } from '../../common/utils/requestWithUser.utils';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateOrderDto, @Req() req: RequestWithUser) {
    return this.ordersService.create(dto, req.user.id, req.user.tenantId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: RequestWithUser) {
    return this.ordersService.findAll(req.user.tenantId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.ordersService.findOne(+id, req.user.tenantId);
  }

  @Get('tracking/:id')
  async tracking(@Param('id') id: string, @Query('token') token: string) {
    return this.ordersService.findTracking(+id, token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() req: RequestWithUser,
  ) {
    return this.ordersService.update(+id, updateOrderDto, req.user.tenantId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('status/:id')
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

  @UseGuards(AuthGuard('jwt'))
  @Patch('comments/:id')
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

  @UseGuards(AuthGuard('jwt'))
  @Patch('finalizar/:id')
  @HttpCode(HttpStatus.OK)
  findTecnico(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.ordersService.finalizar(+id, req.user.tenantId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.ordersService.remove(+id, req.user.tenantId);
  }
}
