import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(slug: string) {
    const post = await this.prisma.post.findUnique({ where: { slug } });

    if (!post) {
      throw new NotFoundException(`Post con slug "${slug}" no encontrado`);
    }

    return post;
  }

  async create(data: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        ...data,
        published: data.published ?? false,
      },
    });
  }

  async update(slug: string, data: UpdatePostDto) {
    const existing = await this.prisma.post.findUnique({ where: { slug } });

    if (!existing) {
      throw new NotFoundException(`Post con slug "${slug}" no encontrado`);
    }

    return this.prisma.post.update({
      where: { slug },
      data,
    });
  }

  async remove(slug: string) {
    const existing = await this.prisma.post.findUnique({ where: { slug } });

    if (!existing) {
      throw new NotFoundException(`Post con slug "${slug}" no encontrado`);
    }

    return this.prisma.post.delete({
      where: { slug },
    });
  }
}
