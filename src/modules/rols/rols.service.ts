import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateRolDto, tenantId: string) {
    const exists = await this.prisma.role.findFirst({ where: { nombre: { equals: dto.nombre, mode: 'insensitive' }, tenantId } });
    if (exists) throw new ConflictException('Ya existe un rol con ese nombre');
    return this.prisma.role.create({ data: { ...dto, tipo: 'USUARIO', tenantId }, include: { _count: { select: { usuarios: true } } } });
  }
  findAll(tenantId: string) { return this.prisma.role.findMany({ where: { tenantId, tipo: 'USUARIO' }, include: { _count: { select: { usuarios: true } } }, orderBy: { nombre: 'asc' } }); }
  async findOne(id: string, tenantId: string) {
    const role = await this.prisma.role.findFirst({ where: { id, tenantId, tipo: 'USUARIO' }, include: { _count: { select: { usuarios: true } } } });
    if (!role) throw new NotFoundException('Rol no encontrado');
    return role;
  }
  async update(id: string, dto: UpdateRolDto, tenantId: string) { await this.findOne(id, tenantId); return this.prisma.role.update({ where: { id }, data: dto, include: { _count: { select: { usuarios: true } } } }); }
  async remove(id: string, tenantId: string) {
    const role = await this.findOne(id, tenantId);
    if (role._count.usuarios) throw new ConflictException('No puedes eliminar un rol que tiene usuarios asignados');
    await this.prisma.role.delete({ where: { id } });
  }
}
