import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { Blog, BlogsSchema } from 'src/models/admin/blogs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogsSchema }]),
  ],
  providers: [BlogsService],
  controllers: [BlogsController],
})
export class BlogsModule {}
