import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { hashPassword } from '../../common/utils/password.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const userSelect = { id: true, usuario: true, email: true, activo: true, ultimo_login: true, createAt: true, tenantId: true, role: { select: { id: true, nombre: true, tipo: true, permisos: true } } } as const;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  private async validateRole(roleId: string | undefined, tenantId: string) {
    if (!roleId) throw new ForbiddenException('Debes asignar un rol al usuario');
    const role = await this.prisma.role.findFirst({ where: { id: roleId, tenantId, tipo: 'USUARIO' } });
    if (!role) throw new ForbiddenException('El rol no pertenece a tu compañía o no es asignable');
    return role.id;
  }
  async create(dto: CreateUserDto, tenantId: string) {
    const roleId = await this.validateRole(dto.roleId, tenantId);
    const exists = await this.prisma.user.findFirst({ where: { OR: [{ usuario: dto.usuario }, { email: dto.email }] } });
    if (exists) throw new ConflictException('El usuario o correo ya está registrado');
    return this.prisma.user.create({ data: { usuario: dto.usuario, email: dto.email, password: await hashPassword(dto.password), activo: dto.activo ?? true, tenantId, roleId }, select: userSelect });
  }
  findAll(tenantId: string) { return this.prisma.user.findMany({ where: { tenantId, role: { tipo: 'USUARIO' } }, select: userSelect, orderBy: { createAt: 'desc' } }); }
  async findOne(id: string, tenantId: string) {
    const user = await this.prisma.user.findFirst({ where: { id, tenantId, role: { tipo: 'USUARIO' } }, select: userSelect });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
  async update(id: string, dto: UpdateUserDto, tenantId: string) {
    await this.findOne(id, tenantId);
    const roleId = dto.roleId === undefined ? undefined : await this.validateRole(dto.roleId, tenantId);
    const { password, ...data } = dto;
    return this.prisma.user.update({ where: { id }, data: { ...data, roleId, ...(password ? { password: await hashPassword(password) } : {}) }, select: userSelect });
  }
  async remove(id: string, tenantId: string) { await this.findOne(id, tenantId); await this.prisma.user.delete({ where: { id } }); }
}
