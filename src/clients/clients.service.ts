import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
// Otras excepciones comunes: BadRequestException 400 UnauthorizedException 401 ForbiddenException 403 NotFoundException 404 ConflictException 409 InternalServerErrorException 500
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const createdClient = await this.prisma.clients.create({
        data: createClientDto,
      });

      if (!createdClient)
        throw new NotFoundException('El cliente no se pudo crear');

      return {
        message: 'Cliente creado exitosamente',
        data: createdClient,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      throw new ConflictException({
        message: 'No se pudo crear el cliente',
        error: errorMessage,
      });
    }
  }

  async findAll() {
    try {
      const findClients = await this.prisma.clients.findMany();

      if (!findClients || findClients.length === 0)
        throw new NotFoundException('No se encontraron clientes');

      return {
        message: 'Clientes encontrados exitosamente',
        data: findClients,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      throw new NotFoundException({
        message: 'No se encontraron clientes',
        error: errorMessage,
      });
    }
  }

  async findOne(id: number) {
    try {
      const findClient = await this.prisma.clients.findUnique({
        where: { id },
      });

      if (!findClient) throw new NotFoundException('Cliente no encontrado');

      return {
        message: 'Cliente encontrado exitosamente',
        data: findClient,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      throw new NotFoundException({
        message: 'Cliente no encontrado',
        error: errorMessage,
      });
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      const findClient = await this.prisma.clients.findUnique({
        where: { id },
      });

      if (!findClient) throw new NotFoundException('Cliente no encontrado');

      return await this.prisma.clients.update({
        where: { id },
        data: updateClientDto,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      throw new NotFoundException({
        message: 'Cliente no encontrado',
        error: errorMessage,
      });
    }
  }

  async remove(id: number) {
    try {
      const findClient = await this.prisma.clients.findUnique({
        where: { id },
      });

      if (!findClient) throw new NotFoundException('Cliente no encontrado');

      return await this.prisma.clients.delete({
        where: { id },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';

      throw new NotFoundException({
        message: 'Cliente no encontrado',
        error: errorMessage,
      });
    }
  }
}
