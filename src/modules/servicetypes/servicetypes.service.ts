import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateServicetypeDto } from './dto/create-servicetype.dto';
import { UpdateServicetypeDto } from './dto/update-servicetype.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ServicetypesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateServicetypeDto) {
    try {
      const createDevice = await this.prisma.serviceTypes.create({
        data: dto,
      });

      return createDevice;
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
      const allDevices = await this.prisma.serviceTypes.findMany();

      return allDevices;
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
      const device = await this.prisma.serviceTypes.findUnique({
        where: { id },
      });

      if (!device) {
        throw new NotFoundException('Tipo de servicio no encontrado');
      }

      return device;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        message: 'Error inesperado',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async update(id: number, dto: UpdateServicetypeDto) {
    try {
      await this.findOne(id);

      const updateDevice = await this.prisma.serviceTypes.update({
        where: { id },
        data: dto,
      });

      return updateDevice;
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

      return await this.prisma.serviceTypes.delete({
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
