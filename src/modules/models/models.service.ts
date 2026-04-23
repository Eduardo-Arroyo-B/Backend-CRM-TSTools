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

  async create(dto: CreateModelDto, userId: string) {
    try {
      const modelExist = await this.prisma.models.findFirst({
        where: {
          nombre: dto.nombre,
        },
      });

      if (modelExist) {
        throw new HttpException('El modelo ya existe', 400);
      }

      const model = await this.prisma.models.create({
        data: {
          ...dto,
          usuarioId: userId,
        },
        select: {
          id: true,
          nombre: true,
          Usuario: {
            select: {
              usuario: true,
            },
          },
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

  async findAll() {
    const allModels = await this.prisma.models.findMany({
      select: {
        id: true,
        nombre: true,
        Usuario: {
          select: {
            usuario: true,
          },
        },
      },
    });

    return allModels;
  }

  async findOne(id: number) {
    const model = await this.prisma.models.findUnique({
      where: { id },
    });

    if (!model)
      throw new NotFoundException(`Modelo con ID ${id} no encontrado`);

    return model;
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    // Valida que el modelo exista
    await this.findOne(id);

    // Hace una copia de los datos a actualizar
    const dataToUpdate = { ...updateModelDto };

    // Se actualiza el modelo
    return this.prisma.models.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: number) {
    // Valida que el modelo exista
    await this.findOne(id);

    return this.prisma.models.delete({
      where: { id },
    });
  }
}
