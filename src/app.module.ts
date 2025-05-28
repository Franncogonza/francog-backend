import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [PrismaModule, PostsModule, BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
