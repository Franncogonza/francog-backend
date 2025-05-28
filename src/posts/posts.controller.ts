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
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ErrorResponse } from '../common/responses/error-response.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los posts' })
  @ApiResponse({ status: 200, description: 'Listado de posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Obtener un post por slug' })
  @ApiResponse({ status: 200, description: 'Post encontrado' })
  @ApiNotFoundResponse({
    description: 'Post no encontrado',
    type: ErrorResponse,
  })
  findOne(@Param('slug') slug: string) {
    return this.postsService.findOne(slug);
  }

  @HttpPost()
  @ApiOperation({ summary: 'Crear un post' })
  @ApiResponse({ status: 201, description: 'Post creado' })
  @ApiBadRequestResponse({
    description: 'Datos inválidos',
    type: ErrorResponse,
  })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Patch(':slug')
  @ApiOperation({ summary: 'Actualizar un post por slug' })
  @ApiResponse({ status: 200, description: 'Post actualizado' })
  @ApiNotFoundResponse({
    description: 'Post no encontrado',
    type: ErrorResponse,
  })
  update(@Param('slug') slug: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(slug, updatePostDto);
  }

  @Delete(':slug')
  @ApiOperation({ summary: 'Eliminar un post por slug' })
  @ApiResponse({ status: 200, description: 'Post eliminado' })
  @ApiNotFoundResponse({
    description: 'Post no encontrado',
    type: ErrorResponse,
  })
  remove(@Param('slug') slug: string) {
    return this.postsService.remove(slug);
  }
}
