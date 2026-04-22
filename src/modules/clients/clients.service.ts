import {
  Injectable,
  NotFoundException,
  HttpException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
// Otras excepciones comunes: BadRequestException 400 UnauthorizedException 401 ForbiddenException 403 NotFoundException 404 ConflictException 409 InternalServerErrorException 500
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateClientDto, userId: string) {
    try {
      const createdClient = await this.prisma.clients.create({
        data: {
          ...dto,
          creador: userId,
        },
      });

      return {
        message: 'Cliente creado exitosamente',
        data: createdClient,
      };
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
      const findClients = await this.prisma.clients.findMany({
        select: {
          id: true,
          nombre: true,
          telefono: true,
          segundoTelefono: true,
          direccion: true,
          tipo: true,
          fechaCreacion: true,
          Usuario: {
            select: {
              usuario: true,
            },
          },
        },
      });

      if (!findClients || findClients.length === 0)
        throw new BadRequestException('No se encontraron clientes');

      return findClients;
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
      const client = await this.prisma.clients.findUnique({
        where: { id },
      });

      if (!client) throw new NotFoundException('Cliente no encontrado');

      return client;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        message: 'Error inesperado',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      // Valida que el cliente exista
      await this.findOne(id);

      // Hace una copia de los datos a actualizar
      const dataToUpdate = { ...updateClientDto };

      const updateClient = await this.prisma.clients.update({
        where: { id },
        data: dataToUpdate,
      });

      return {
        message: 'Cliente actualizado exitosamente',
        data: updateClient,
      };
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

      return await this.prisma.clients.delete({
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
