import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
