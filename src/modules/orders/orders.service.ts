import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../../prisma/prisma.service';
import CryptoJS from 'crypto-js';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto, userId: string, tenantId: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const trackingToken = CryptoJS.lib.WordArray.random(32).toString();

      const createdOrder = await this.prisma.orders.create({
        data: {
          ...dto,
          atendio: userId,
          tenantId,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          trackingToken,
        },
      });

      return {
        message: 'Orden creada exitosamente',
        data: createdOrder,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        message: 'Error inesperado',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async findAll(tenantId: string) {
    try {
      const allorders = await this.prisma.orders.findMany({
        where: {
          tenantId,
        },
        select: {
          id: true,
          createAt: true,
          estado: true,
          total: true,
          estado_pago: true,
          descripcion: true,
          trackingToken: true,
          Modelo: {
            select: {
              nombre: true,
            },
          },
          Marca: {
            select: {
              marca: true,
            },
          },
          Servicio: {
            include: {
              TipoServicio: true,
            },
          },
          Clientes: {
            select: {
              nombre: true,
            },
          },
          Usuario: {
            select: {
              usuario: true,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      });

      return allorders;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        message: 'Error inesperado',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async findOne(id: number, tenantId: string) {
    try {
      const order = await this.prisma.orders.findFirst({
        where: {
          id,
          tenantId,
        },
        select: {
          id: true,
          createAt: true,
          estado: true,
          total: true,
          Clientes: true,
          estado_pago: true,
          Usuario: {
            select: {
              usuario: true,
            },
          },
        },
      });

      if (!order) {
        throw new NotFoundException('Orden no encontrada');
      }

      return order;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        message: 'Error inesperado',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async findTracking(id: number, token: string) {
    if (!token) {
      throw new UnauthorizedException('Token requerido');
    }

    const order = await this.prisma.orders.findFirst({
      where: {
        id,
        trackingToken: token,
      },
      select: {
        id: true,
        createAt: true,
        estado: true,
        total: true,
        Clientes: true,
        estado_pago: true,
        Usuario: {
          select: {
            usuario: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    return order;
  }

  async update(id: number, dto: UpdateOrderDto, tenantId: string) {
    try {
      // Valida que la orden exista
      await this.findOne(id, tenantId);

      // Hace una copia de los datos a actualizar
      const dataToUpdate = { ...dto };

      const order = await this.prisma.orders.findFirst({
        where: {
          id,
          tenantId,
        },
      });

      if (!order) {
        throw new NotFoundException('Orden no encontrada');
      }

      const updatedOrder = await this.prisma.orders.update({
        where: { id, tenantId },
        data: dataToUpdate,
      });

      return {
        message: 'Orden actualizada exitosamente',
        data: updatedOrder,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        message: 'Error inesperado',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async remove(id: number, tenantId: string) {
    try {
      await this.findOne(id, tenantId);

      return await this.prisma.orders.delete({
        where: { id, tenantId },
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        message: 'Error inesperado',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }
}
