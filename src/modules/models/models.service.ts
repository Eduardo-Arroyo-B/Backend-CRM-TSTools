import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ModelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateModelDto, userId: string, tenantId: string) {
    try {
      await this.validateTenantBrand(dto.brandId, tenantId);
      const modelExist = await this.prisma.models.findFirst({
        where: {
          nombre: dto.nombre,
          brandId: dto.brandId,
          tenantId,
        },
      });

      if (modelExist) {
        throw new HttpException('El modelo ya existe', 400);
      }

      const model = await this.prisma.models.create({
        data: {
          ...dto,
          usuarioId: userId,
          tenantId,
        },
        select: {
          id: true,
          nombre: true,
          Usuario: {
            select: {
              usuario: true,
            },
          },
          Marca: { select: { id: true, marca: true } },
          brandId: true,
          tenantId: true,
        },
      });

      return model;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException({
        message: 'Ha ocurrido un error al crear el usuario',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async findAll(tenantId: string) {
    const allModels = await this.prisma.models.findMany({
      where: {
        OR: [{ tenantId: null }, { tenantId }],
      },
      select: {
        id: true,
        nombre: true,
        brandId: true,
        tenantId: true,
        Usuario: {
          select: {
            usuario: true,
          },
        },
        Marca: { select: { id: true, marca: true } },
      },
      orderBy: {
        id: 'desc',
      },
    });

    return allModels;
  }

  async findOne(id: number, tenantId: string) {
    const model = await this.prisma.models.findUnique({
      where: { id, tenantId },
    });

    if (!model)
      throw new NotFoundException(`Modelo con ID ${id} no encontrado`);

    return model;
  }

  async update(id: number, updateModelDto: UpdateModelDto, tenantId: string) {
    // Valida que el modelo exista
    const currentModel = await this.findOne(id, tenantId);

    // Hace una copia de los datos a actualizar
    const dataToUpdate = { ...updateModelDto };

    if (updateModelDto.brandId !== undefined) {
      await this.validateTenantBrand(updateModelDto.brandId, tenantId);
    }

    const duplicate = await this.prisma.models.findFirst({
      where: {
        id: { not: id },
        nombre: updateModelDto.nombre ?? currentModel.nombre,
        brandId: updateModelDto.brandId ?? currentModel.brandId,
        tenantId,
      },
      select: { id: true },
    });

    if (duplicate) {
      throw new HttpException('El modelo ya existe para esta marca', 400);
    }

    // Se actualiza el modelo
    return this.prisma.models.update({
      where: { id, tenantId },
      data: dataToUpdate,
      include: { Marca: true, Usuario: { select: { usuario: true } } },
    });
  }

  async remove(id: number, tenantId: string) {
    // Valida que el modelo exista
    await this.findOne(id, tenantId);

    return this.prisma.models.delete({
      where: { id, tenantId },
    });
  }

  private async validateTenantBrand(brandId: number, tenantId: string) {
    const brand = await this.prisma.brands.findFirst({
      where: {
        id: brandId,
        OR: [{ tenantId: null }, { tenantId }],
      },
      select: { id: true },
    });

    if (!brand) {
      throw new HttpException(
        'La marca no existe o no está disponible para esta empresa',
        400,
      );
    }
  }
}
