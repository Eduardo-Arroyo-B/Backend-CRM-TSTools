import { Injectable } from '@nestjs/common';
import { CreateTechnicalDto } from './dto/create-technical.dto';
import { UpdateTechnicalDto } from './dto/update-technical.dto';

@Injectable()
export class TechnicalService {
  create(createTechnicalDto: CreateTechnicalDto) {
    return 'This action adds a new technical';
  }

  findAll() {
    return `This action returns all technical`;
  }

  findOne(id: number) {
    return `This action returns a #${id} technical`;
  }

  update(id: number, updateTechnicalDto: UpdateTechnicalDto) {
    return `This action updates a #${id} technical`;
  }

  remove(id: number) {
    return `This action removes a #${id} technical`;
  }
}
