import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { hashPassword } from '../../common/utils/password.util';
import { comparePassword } from '../../common/utils/password.util';
import { generateToken } from '../../common/utils/JWTToken';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(usuario: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { usuario },
    });

    if (!user) {
      throw new NotFoundException('Usuario o contraseña incorrectos');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Usuario o contraseña incorrectos');
    }

    const payload = {
      sub: user.id,
      usuario: user.usuario,
      activo: user.activo,
    };

    return {
      access_token: generateToken(payload),
    };
  }

  async create(createAuthDto: CreateAuthDto) {
    try {
      const usuarioExiste = await this.prisma.user.findUnique({
        where: { usuario: createAuthDto.usuario },
      });

      if (usuarioExiste) throw new NotFoundException('El usuario ya existe');

      const hashedPassword: string = await hashPassword(createAuthDto.password);

      const user = await this.prisma.user.create({
        data: {
          ...createAuthDto,
          password: hashedPassword,
        },
        select: {
          id: true,
          usuario: true,
          activo: true,
          ultimo_login: true,
        },
      });

      return user;
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
    const allUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        usuario: true,
        activo: true,
        ultimo_login: true,
      },
    });

    if (allUsers.length === 0)
      throw new NotFoundException('No se encontraron usuarios');

    return allUsers;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        usuario: true,
        activo: true,
        ultimo_login: true,
      },
    });

    if (!user) throw new NotFoundException(`Usuario #${id} no encontrado`);

    return user;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    // Valida que el usuario exista
    await this.findOne(id);

    // Hace una copia de los datos a actualizar
    const dataToUpdate = { ...updateAuthDto };

    // Hashea el nuevo password si se proporciona
    if (updateAuthDto.password) {
      dataToUpdate.password = await hashPassword(updateAuthDto.password);
    }

    // Se actualiza la informacion del usuario
    return this.prisma.user.update({
      where: { id },
      data: dataToUpdate,
      select: {
        id: true,
        usuario: true,
        activo: true,
        ultimo_login: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // valida que exista

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
