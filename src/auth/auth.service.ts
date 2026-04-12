import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuthDto: CreateAuthDto) {
    const usuarioExiste = await this.prisma.user.findUnique({
      where: { usuario: createAuthDto.usuario },
    });

    if (usuarioExiste) throw new ConflictException('El usuario ya existe');

    return this.prisma.user.create({
      data: createAuthDto,
    });
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany();

    if (!allUsers) throw new NotFoundException('No se encontraron usuarios');

    return allUsers;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException(`Usuario #${id} no encontrado`);

    return user;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    await this.findOne(id); // valida que exista

    return this.prisma.user.update({
      where: { id },
      data: updateAuthDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // valida que exista

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
