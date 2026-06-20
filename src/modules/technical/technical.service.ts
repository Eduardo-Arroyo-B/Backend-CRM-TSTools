import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTechnicalDto } from './dto/create-technical.dto';
import { UpdateTechnicalDto } from './dto/update-technical.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TechnicalService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTechnicalDto: CreateTechnicalDto,
    userId: string,
    tenantId: string,
  ) {
    try {
      const technical = await this.prisma.technical.create({
        data: {
          ...createTechnicalDto,
          usuarioId: userId,
          tenantId,
        },
        select: {
          id: true,
          nombre: true,
        },
      });

      if (!technical) {
        throw new HttpException('No se pudo crear el técnico', 400);
      }

      return technical;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException({
        message: 'Ha ocurrido un error al crear el técnico',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async findAll(tenantId: string) {
    try {
      return await this.prisma.technical.findMany({
        where: {
          tenantId,
        },
        orderBy: {
          nombre: 'asc',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ha ocurrido un error al obtener los técnicos',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async findOne(id: number, tenantId: string) {
    try {
      const technical = await this.prisma.technical.findUnique({
        where: { id, tenantId },
      });

      if (!technical) {
        throw new NotFoundException('Técnico no encontrado');
      }

      return technical;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException({
        message: 'Ha ocurrido un error al obtener el técnico',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async update(
    id: number,
    updateTechnicalDto: UpdateTechnicalDto,
    tenantId: string,
  ) {
    try {
      const technicalExists = await this.prisma.technical.findUnique({
        where: { id, tenantId },
      });

      if (!technicalExists) {
        throw new NotFoundException('Técnico no encontrado');
      }

      return await this.prisma.technical.update({
        where: { id },
        data: updateTechnicalDto,
        select: {
          id: true,
          nombre: true,
        },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException({
        message: 'Ha ocurrido un error al actualizar el técnico',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async remove(id: number, tenantId: string) {
    try {
      const technicalExists = await this.prisma.technical.findUnique({
        where: { id, tenantId },
      });

      if (!technicalExists) {
        throw new NotFoundException('Técnico no encontrado');
      }

      await this.prisma.technical.delete({
        where: { id },
      });

      return {
        message: 'Técnico eliminado correctamente',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException({
        message: 'Ha ocurrido un error al eliminar el técnico',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }
}
