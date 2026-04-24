import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    try {
      const createService = await this.prisma.services.create({
        data: {
          ...dto,
        },
      });

      return {
        message: 'Servicio creado exitosamente',
        data: createService,
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
      const allServices = await this.prisma.services.findMany({
        select: {
          id: true,
          tipo: true,
          equipo: true,
          concepto: true,
          Marca: true,
          Modelo: true,
          garantia: true,
          precio_publico: true,
          precio_mayorista: true,
          createAt: true,
        },
        orderBy: {
          id: 'desc',
        },
      });

      return allServices;
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
      const service = await this.prisma.services.findUnique({
        where: { id },
      });

      if (!service) {
        throw new NotFoundException({
          message: 'Servicio no encontrado',
        });
      }

      return service;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        message: 'Error inesperado',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      await this.findOne(id);

      const dataToUpdate = { ...updateServiceDto };

      const updateService = await this.prisma.services.update({
        where: { id },
        data: dataToUpdate,
      });

      return {
        message: 'Servicio actualizado exitosamente',
        service: updateService,
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

      return await this.prisma.services.delete({
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
