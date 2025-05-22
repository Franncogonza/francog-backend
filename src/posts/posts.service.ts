import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Post } from '../../generated/prisma';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(slug: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { slug } });

    if (!post) {
      throw new NotFoundException(`Post con slug "${slug}" no encontrado`);
    }

    return post;
  }

  async create(
    data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  async delete(id: number): Promise<Post> {
    return this.prisma.post.delete({ where: { id } });
  }
}
