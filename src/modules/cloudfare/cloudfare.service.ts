import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Express } from 'express';

import axios from 'axios';
import FormData from 'form-data';

interface CloudflareUploadResponse {
  result: {
    id: string;
  };
}

@Injectable()
export class CloudfareService {
  private readonly accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

  private readonly apiToken = process.env.CLOUDFLARE_API_TOKEN;

  private readonly imageHash = process.env.CLOUDFLARE_IMAGES_HASH;

  async uploadImage(file: Express.Multer.File) {
    try {
      const { buffer, originalname, mimetype } = file;
      const formData = new FormData();
      formData.append('file', buffer, {
        filename: originalname,

        contentType: mimetype,
      });

      const response = await axios.post<CloudflareUploadResponse>(
        `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/images/v1`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.apiToken}`,
            ...formData.getHeaders(),
          },
        },
      );
      return response.data.result.id;
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error al subir imagen a Cloudflare',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  buildImageUrl(imageId: string) {
    return `https://imagedelivery.net/${this.imageHash}/${imageId}/public`;
  }

  async deleteImage(imageId: string) {
    try {
      await axios.delete(
        `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/images/v1/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${this.apiToken}`,
          },
        },
      );

      return {
        message: 'Imagen eliminada exitosamente',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error al eliminar imagen',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  getImage(imageId: string) {
    return {
      imageId,
      url: this.buildImageUrl(imageId),
    };
  }
}
