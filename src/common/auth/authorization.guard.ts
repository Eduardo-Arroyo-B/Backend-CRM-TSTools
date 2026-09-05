import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import { Permission } from './permissions';

const PERMISSIONS_KEY = 'required_permissions';
const ROLE_TYPES_KEY = 'required_role_types';

export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
export const RequireRoleTypes = (
  ...roles: Array<'SADMIN' | 'ADMIN' | 'USUARIO'>
) => SetMetadata(ROLE_TYPES_KEY, roles);

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const permissions =
      this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? [];
    const roleTypes =
      this.reflector.getAllAndOverride<Array<'SADMIN' | 'ADMIN' | 'USUARIO'>>(
        ROLE_TYPES_KEY,
        [context.getHandler(), context.getClass()],
      ) ?? [];
    const request = context.switchToHttp().getRequest();
    const authenticatedUserId = request.user?.id;
    if (!authenticatedUserId)
      throw new UnauthorizedException('Sesión no válida o expirada');

    const user = await this.prisma.user.findUnique({
      where: { id: authenticatedUserId },
      include: { role: true },
    });

    if (!user) throw new ForbiddenException('Usuario sin acceso');
    // Compatibilidad con instalaciones anteriores a la migración: un usuario de tenant sin rol es ADMIN.
    const type = user.role?.tipo ?? (user.tenantId ? 'ADMIN' : 'USUARIO');
    request.user.role = type;
    request.user.permissions = user.role?.permisos ?? [];

    if (type === 'SADMIN') return true;
    if (roleTypes.length && !roleTypes.includes(type))
      throw new ForbiddenException('Tu rol no tiene acceso a este recurso');
    if (type === 'ADMIN') return true;
    if (
      permissions.every((permission) =>
        user.role?.permisos.includes(permission),
      )
    )
      return true;
    throw new ForbiddenException('No tienes los permisos necesarios');
  }
}
