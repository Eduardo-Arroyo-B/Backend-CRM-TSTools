import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicesGlobalDto } from './dto/create-services_global.dto';
import { UpdateServicesGlobalDto } from './dto/update-services_global.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ServicesGlobalService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateServicesGlobalDto) {
    const service = await this.prisma.globalService.create({
      data: {
        ...dto,
        requisitos: dto.requisitos ?? [],
      },
    });

    return { message: 'Servicio global creado exitosamente', data: service };
  }

  findAll() {
    return this.prisma.globalService.findMany({ orderBy: { createAt: 'desc' } });
  }

  async findOne(id: number) {
    const service = await this.prisma.globalService.findUnique({ where: { id } });
    if (!service) throw new NotFoundException('Servicio global no encontrado');
    return service;
  }

  async update(id: number, dto: UpdateServicesGlobalDto) {
    await this.findOne(id);
    const service = await this.prisma.globalService.update({
      where: { id },
      data: dto,
    });
    return { message: 'Servicio global actualizado exitosamente', data: service };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.globalService.delete({ where: { id } });
    return { message: 'Servicio global eliminado exitosamente' };
  }
}
