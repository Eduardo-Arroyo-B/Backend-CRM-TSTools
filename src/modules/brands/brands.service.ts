import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBrandDto, userId: string) {
    try {
      const brandExist = await this.prisma.brands.findFirst({
        where: { marca: dto.marca },
      });

      if (brandExist) throw new HttpException('La marca ya existe', 400);

      const brand = await this.prisma.brands.create({
        data: {
          ...dto,
          usuario: userId,
        },
        select: {
          id: true,
          marca: true,
          createAt: true,
          Usuario: {
            select: {
              usuario: true,
            },
          },
        },
      });

      return brand;
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
    const allBrands = await this.prisma.brands.findMany({
      select: {
        id: true,
        marca: true,
        createAt: true,
        Usuario: {
          select: {
            usuario: true,
          },
        },
        Modelos: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      orderBy: {
        marca: 'desc',
      },
    });

    if (allBrands.length === 0)
      throw new NotFoundException('No se encontraron marcas');

    return allBrands;
  }

  async findOne(id: number) {
    const brand = await this.prisma.brands.findUnique({
      where: { id },
    });

    if (!brand) throw new NotFoundException(`Marca con ID ${id} no encontrada`);

    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    // Valida que el marca exista
    await this.findOne(id);

    // Hace una copia de los datos a actualizar
    const dataToUpdate = { ...updateBrandDto };

    return this.prisma.brands.update({
      where: { id },
      data: dataToUpdate,
      select: {
        id: true,
        marca: true,
        createAt: true,
        Usuario: {
          select: {
            usuario: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    // Valida que el marca exista
    await this.findOne(id);

    return this.prisma.brands.delete({
      where: { id },
    });
  }
}
