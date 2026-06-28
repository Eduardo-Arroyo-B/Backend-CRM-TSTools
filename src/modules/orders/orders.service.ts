import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../../prisma/prisma.service';
import CryptoJS from 'crypto-js';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

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
          observaciones: true,
          comentarios: true,
          Tecnico: {
            select: {
              nombre: true,
            },
          },
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
            select: {
              TipoServicio: {
                select: {
                  nombre: true,
                  descripcion: true,
                },
              },
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

  async updateStatus(id: number, dto: UpdateOrderStatusDto, tenantId: string) {
    try {
      const findOrder = await this.findOne(id, tenantId);

      if (!findOrder) {
        throw new NotFoundException('Orden no encontrada');
      }

      const updatedOrder = await this.prisma.orders.update({
        where: { id, tenantId },
        data: dto,
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

  async updateStatusReturn(id: number, tenantId: string) {
    try {
      const findOrder = await this.findOne(id, tenantId);

      if (!findOrder) {
        throw new NotFoundException('Orden no encontrada');
      }

      const updatedOrder = await this.prisma.$transaction([
        this.prisma.comentarios.deleteMany({
          where: { ordenId: id },
        }),
        this.prisma.observaciones.deleteMany({
          where: { ordenId: id },
        }),
        this.prisma.orders.update({
          where: { id, tenantId },
          data: {
            estado: 'PENDIENTE',
            tecnicoId: null,
          },
        }),
      ]);

      return {
        message: 'Estado actualizado exitosamente',
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

  async updateComments(id: number, dto: UpdateCommentDto, tenantId: string) {
    try {
      const findOrder = await this.findOne(id, tenantId);

      if (!findOrder) {
        throw new NotFoundException('Orden no encontrada');
      }

      const updateComment = await this.prisma.orders.update({
        where: { id, tenantId },
        data: {
          comentario: dto.comentarios,
        },
      });

      return {
        message: 'Comentario Actualizado/Creado Exitosamente',
        data: updateComment,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        message: 'Error inesperado',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async createComment(id: number, dto: UpdateCommentDto) {
    try {
      const comment = await this.prisma.comentarios.create({
        data: {
          ordenId: id,
          comentario: dto.comentarios,
        },
      });

      return {
        message: 'Comentario creado exitosamente',
        data: comment,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        message: 'Error inesperado',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async estadoPago(id: number, tenantId: string) {
    try {
      const findOrder = await this.findOne(id, tenantId);

      if (!findOrder) {
        throw new NotFoundException('Orden no encontrada');
      }

      const updatedOrder = await this.prisma.orders.update({
        where: { id, tenantId },
        data: { estado_pago: 'PAGADO' },
      });

      return {
        message: 'Estado de pago actualizado exitosamente',
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

  async finalizar(id: number, tenantId: string) {
    try {
      const findOrder = await this.findOne(id, tenantId);

      if (!findOrder) {
        throw new NotFoundException('Orden no encontrada');
      }

      const updatedOrder = await this.prisma.orders.update({
        where: { id, tenantId },
        data: { estado: 'REPARADO' },
      });

      return {
        message: 'Orden finalizada exitosamente',
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
