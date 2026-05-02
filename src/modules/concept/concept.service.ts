import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateConceptDto } from './dto/create-concept.dto';
import { UpdateConceptDto } from './dto/update-concept.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ConceptService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateConceptDto) {
    try {
      const createConcept = await this.prisma.concept.create({
        data: dto,
      });

      return createConcept;
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
      const allConcept = await this.prisma.concept.findMany();

      return allConcept;
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
      const concept = await this.prisma.concept.findUnique({
        where: { id },
      });

      if (!concept) {
        throw new NotFoundException('Concepto no encontrado');
      }

      return concept;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        message: 'Error inesperado',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async update(id: number, updateDeviceDto: UpdateConceptDto) {
    try {
      await this.findOne(id);

      const updateConcept = await this.prisma.concept.update({
        where: { id },
        data: updateDeviceDto,
      });

      return updateConcept;
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

      return await this.prisma.concept.delete({
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
