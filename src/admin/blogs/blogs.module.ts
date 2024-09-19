import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { Blog, BlogsSchema } from 'src/models/admin/blogs.schema';
// import { MulterService } from 'src/libs/common/src/multer/multer.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterService } from 'src/libs/common/src/multer/multer.service';
import { CommonModule } from 'src/libs/common/src';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogsSchema }]),
    MulterModule,
    CommonModule,
  ],
  providers: [BlogsService, MulterService],
  controllers: [BlogsController],
})
export class BlogsModule {}
