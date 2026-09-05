import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto, userId: string) {
    try {
      await this.validateGlobalCatalog(dto.marcaId, dto.modeloId);
      return await this.prisma.products.create({
        data: { ...dto, creadorId: userId },
        include: { Marca: true, Modelo: true },
      });
    } catch (error) {
      this.handleUniqueConstraint(error);
      throw error;
    }
  }

  findAll() {
    return this.prisma.products.findMany({
      include: { Marca: true, Modelo: true },
      orderBy: { nombre: 'asc' },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.products.findUnique({
      where: { id },
      include: { Marca: true, Modelo: true },
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const currentProduct = await this.findOne(id);
    try {
      await this.validateGlobalCatalog(
        dto.marcaId === undefined ? currentProduct.marcaId : dto.marcaId,
        dto.modeloId === undefined ? currentProduct.modeloId : dto.modeloId,
      );
      return await this.prisma.products.update({
        where: { id },
        data: dto,
        include: { Marca: true, Modelo: true },
      });
    } catch (error) {
      this.handleUniqueConstraint(error);
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.products.delete({ where: { id } });
  }

  private async validateGlobalCatalog(
    marcaId?: number | null,
    modeloId?: number | null,
  ): Promise<void> {
    if (modeloId && !marcaId) {
      throw new BadRequestException(
        'Debes seleccionar una marca para el modelo indicado',
      );
    }

    if (marcaId) {
      const brand = await this.prisma.brands.findFirst({
        where: { id: marcaId, tenantId: null },
        select: { id: true },
      });
      if (!brand) {
        throw new BadRequestException(
          'La marca no pertenece al catálogo global',
        );
      }
    }

    if (modeloId) {
      const model = await this.prisma.models.findFirst({
        where: { id: modeloId, brandId: marcaId!, tenantId: null },
        select: { id: true },
      });
      if (!model) {
        throw new BadRequestException(
          'El modelo no pertenece a la marca global seleccionada',
        );
      }
    }
  }

  private handleUniqueConstraint(error: unknown): void {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException('El SKU ya existe en el catálogo global');
    }
  }
}
