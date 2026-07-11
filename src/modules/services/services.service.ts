import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CloudfareService } from '../cloudfare/cloudfare.service';

@Injectable()
export class ServicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudfareService: CloudfareService,
  ) {}

  async create(
    dto: CreateServiceDto,
    tenantId: string,
    image?: Express.Multer.File,
    notesImage?: Express.Multer.File,
  ) {
    try {
      let imageUrl: string | null = null;
      let notesImageUrl: string | null = null;

      if (image) {
        const imageId = await this.cloudfareService.uploadImage(image);
        imageUrl = this.cloudfareService.buildImageUrl(imageId);
      }

      if (notesImage) {
        const notesImageId =
          await this.cloudfareService.uploadImage(notesImage);

        notesImageUrl = this.cloudfareService.buildImageUrl(notesImageId);
      }

      console.log(dto)

      const createService = await this.prisma.services.create({
        data: {
          ...dto,
          fotoURL: imageUrl,
          fotoNotasURL: notesImageUrl,
          tenantId,
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

  async findAll(tenantId: string) {
    try {
      const allServices = await this.prisma.services.findMany({
        where: {
          tenantId,
        },
        select: {
          id: true,
          TipoServicio: true,
          Equipo: true,
          Concepto: true,
          Marca: true,
          Modelo: true,
          garantia: true,
          precio_publico: true,
          precio_mayorista: true,
          notas: true,
          proceso: true,
          fotoURL: true,
          fotoNotasURL: true,
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

  async findOne(id: number, tenantId: string) {
    try {
      const service = await this.prisma.services.findUnique({
        where: { id, tenantId },
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

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
    tenantId: string,
  ) {
    try {
      await this.findOne(id, tenantId);

      const dataToUpdate = { ...updateServiceDto };

      const updateService = await this.prisma.services.update({
        where: { id, tenantId },
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

  async remove(id: number, tenantId: string) {
    try {
      await this.findOne(id, tenantId);

      return await this.prisma.services.delete({
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
