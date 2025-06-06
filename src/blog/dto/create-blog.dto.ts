import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ example: 'Título del blog' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'titulo-del-blog' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'Descripción breve del blog' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Contenido completo del blog' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: ['nestjs', 'prisma', 'swagger'] })
  @IsArray()
  tags: string[];

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
