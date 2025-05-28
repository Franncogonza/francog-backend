import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post as HttpPost,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ErrorResponse } from '../common/responses/error-response.dto';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los blogs' })
  @ApiResponse({ status: 200, description: 'Listado de blogs' })
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Obtener un blog por slug' })
  @ApiResponse({ status: 200, description: 'Blog encontrado' })
  @ApiNotFoundResponse({
    description: 'Blog no encontrado',
    type: ErrorResponse,
  })
  findOne(@Param('slug') slug: string) {
    return this.blogService.findOne(slug);
  }

  @HttpPost()
  @ApiOperation({ summary: 'Crear un blog' })
  @ApiResponse({ status: 201, description: 'Blog creado' })
  @ApiBadRequestResponse({
    description: 'Datos inválidos',
    type: ErrorResponse,
  })
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Patch(':slug')
  @ApiOperation({ summary: 'Actualizar un blog por slug' })
  @ApiResponse({ status: 200, description: 'Blog actualizado' })
  @ApiNotFoundResponse({
    description: 'Blog no encontrado',
    type: ErrorResponse,
  })
  update(@Param('slug') slug: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(slug, updateBlogDto);
  }

  @Delete(':slug')
  @ApiOperation({ summary: 'Eliminar un blog por slug' })
  @ApiResponse({ status: 200, description: 'Blog eliminado' })
  @ApiNotFoundResponse({
    description: 'Blog no encontrado',
    type: ErrorResponse,
  })
  remove(@Param('slug') slug: string) {
    return this.blogService.remove(slug);
  }
}
