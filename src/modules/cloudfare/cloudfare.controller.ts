import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { CloudfareService } from './cloudfare.service';

@Controller('cloudfare')
export class CloudfareController {
  constructor(private readonly cloudfareService: CloudfareService) {}

  /**
   * SUBIR IMAGEN
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const imageId = await this.cloudfareService.uploadImage(file);

    return {
      message: 'Imagen subida exitosamente',
      imageId,
      url: this.cloudfareService.buildImageUrl(imageId),
    };
  }

  /**
   * ELIMINAR IMAGEN
   */
  @Delete(':imageId')
  async deleteImage(@Param('imageId') imageId: string) {
    return await this.cloudfareService.deleteImage(imageId);
  }
}
