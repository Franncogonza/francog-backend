import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from '../../generated/prisma';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string): Promise<Post> {
    return this.postsService.findOne(slug);
  }
}
