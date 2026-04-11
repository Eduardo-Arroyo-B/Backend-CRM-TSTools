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

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException(`Usuario #${id} no encontrado`);

    return user;
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    await this.findOne(id); // valida que exista

    return this.prisma.user.update({
      where: { id },
      data: updateAuthDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // valida que exista

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
