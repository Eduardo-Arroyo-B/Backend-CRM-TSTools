import * as jwt from 'jsonwebtoken';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

type JwtPayload = {
  sub: string;
  usuario: string;
};

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET no está definido');
  }

  return secret;
}

export function generateToken(payload: {
  sub: any;
  usuario: any;
  activo: any;
}): string {
  return jwt.sign(payload, getJwtSecret(), {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
}

export function verifyToken(token: string): JwtPayload {
  try {
    const decoded: unknown = jwt.verify(token, getJwtSecret());

    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'sub' in decoded &&
      'usuario' in decoded
    ) {
      return decoded as JwtPayload;
    }

    return decoded as JwtPayload;
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
