import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechnicalService } from './technical.service';
import { CreateTechnicalDto } from './dto/create-technical.dto';
import { UpdateTechnicalDto } from './dto/update-technical.dto';

@Controller('technical')
export class TechnicalController {
  constructor(private readonly technicalService: TechnicalService) {}

  @Post()
  create(@Body() createTechnicalDto: CreateTechnicalDto) {
    return this.technicalService.create(createTechnicalDto);
  }

  @Get()
  findAll() {
    return this.technicalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTechnicalDto: UpdateTechnicalDto) {
    return this.technicalService.update(+id, updateTechnicalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technicalService.remove(+id);
  }
}
