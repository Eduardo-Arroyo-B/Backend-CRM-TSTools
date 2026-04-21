import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto, userId: string) {
    try {
      const createdOrder = await this.prisma.orders.create({
        data: {
          ...dto,
          atendio: userId,
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

  async findAll() {
    try {
      const allorders = await this.prisma.orders.findMany({
        select: {
          id: true,
          createAt: true,
          estado: true,
          total: true,
          estado_pago: true,
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
      });

      if (!allorders || allorders.length === 0) {
        throw new NotFoundException('No se encontraron órdenes');
      }

      return allorders;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        message: 'Error inesperado',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async findOne(id: number) {
    try {
      const order = await this.prisma.orders.findUnique({
        where: { id },
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

  async update(id: number, dto: UpdateOrderDto) {
    try {
      // Valida que la orden exista
      await this.findOne(id);

      // Hace una copia de los datos a actualizar
      const dataToUpdate = { ...dto };

      const updatedOrder = await this.prisma.orders.update({
        where: { id },
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

  async remove(id: number) {
    try {
      await this.findOne(id);

      return await this.prisma.orders.delete({
        where: { id },
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
