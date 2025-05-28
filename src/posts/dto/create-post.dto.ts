import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Título del post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'titulo-del-post' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'Descripción breve del post' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Contenido completo del post' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: ['nestjs', 'prisma', 'backend'] })
  @IsArray()
  tags: string[];

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
