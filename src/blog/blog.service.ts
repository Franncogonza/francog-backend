import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(slug: string) {
    const blog = await this.prisma.blog.findUnique({ where: { slug } });

    if (!blog) {
      throw new NotFoundException(`Blog con slug "${slug}" no encontrado`);
    }

    return blog;
  }

  async create(data: CreateBlogDto) {
    return this.prisma.blog.create({
      data: {
        ...data,
        published: data.published ?? false,
      },
    });
  }

  async update(slug: string, data: UpdateBlogDto) {
    const existing = await this.prisma.blog.findUnique({ where: { slug } });

    if (!existing) {
      throw new NotFoundException(`Blog con slug "${slug}" no encontrado`);
    }

    return this.prisma.blog.update({
      where: { slug },
      data,
    });
  }

  async remove(slug: string) {
    const existing = await this.prisma.blog.findUnique({ where: { slug } });

    if (!existing) {
      throw new NotFoundException(`Blog con slug "${slug}" no encontrado`);
    }

    return this.prisma.blog.delete({
      where: { slug },
    });
  }
}
