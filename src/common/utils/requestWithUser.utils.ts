import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    usuario: string;
    tenantId: string;
    logoURL: string;
    role: 'SADMIN' | 'ADMIN' | 'USUARIO';
    permissions: string[];
    // Aqui se pueden agregar más propiedades del JWT
  };
}
