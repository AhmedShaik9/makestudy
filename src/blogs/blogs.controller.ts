// src/blogs/blogs.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
  Delete,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { BlogsService } from './blogs.service';
import { Types } from 'mongoose';
import { CreateBlogDto } from 'src/dtos/blog.dto';
import { MulterService } from 'src/libs/common/src/multer/multer.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { extname } from 'path';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogService: BlogsService,
    private readonly multerService: MulterService,
  ) {}

  @Get()
  async getAllBlogs(
    @Res() res: Response,
    @Query('skip') skip: number,
    @Query('limit') limit: number,
  ) {
    try {
      const blogs = await this.blogService.getAllBlogs(skip, limit);
      const baseUrl = '../../uploads/blogs/';
      // const url='../../uploads/blogs/1725386083817-158548173.png';
      const blogsWithUrls = blogs.map((blog) => ({
        ...blog.toObject(),
        featured_image: baseUrl + blog.featured_image,
        thumb_image: baseUrl + blog.thumb_image,
      }));

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Blogs fetched successfully',
        data: blogsWithUrls,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch blogs',
        error: error.message,
      });
    }
  }

  @Get(':id')
  async getBlogById(@Param('id') id: string, @Res() res: Response) {
    try {
      const blog = await this.blogService.getBlogById(new Types.ObjectId(id));
      if (!blog) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Blog not found',
        });
      }

      const baseUrl = '../../uploads/blogs/'; // This matches the `serveRoot` configuration
      const blogWithUrls = {
        ...blog.toObject(),
        featured_image: baseUrl + blog.featured_image,
        thumb_image: baseUrl + blog.thumb_image,
      };

      console.log(blogWithUrls);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Blog fetched successfully',
        data: blogWithUrls,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch blog',
        error: error.message,
      });
    }
  }

  @Get('slug/:slug')
  async getBlogBySlug(@Param('slug') slug: string, @Res() res: Response) {
    try {
      const blog = await this.blogService.getBlogBySlug(slug);
      if (!blog) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Blog not found',
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Blog fetched successfully',
        data: blog,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch blog',
        error: error.message,
      });
    }
  }

  @Post('create-blog')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: 'uploads/blogs',
        filename: (req, file, callback) => {
          // const uniqueSuffix =
          //   Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async createBlog(
    @Body() createBlogDto: CreateBlogDto,
    @Res() res: Response,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      console.log(files);
      createBlogDto.featured_image = files[0].filename;
      createBlogDto.thumb_image = files[1].filename;
      const createdBlog = await this.blogService.createBlog(createBlogDto);
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Blog created successfully',
        data: createdBlog,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create blog',
        error: error.message,
      });
    }
  }

  @Post('update-blog/:id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: 'uploads/blogs',
        filename: (req, file, callback) => {
          // const uniqueSuffix =
          //   Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async updateBlog(
    @Param('id') id: string,
    @Body() createBlogDto: CreateBlogDto,
    @Res() res: Response,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      createBlogDto.featured_image = files[0].filename;
      createBlogDto.thumb_image = files[1].filename;
      const updatedBlog = await this.blogService.updateBlog(
        new Types.ObjectId(id),
        createBlogDto,
      );
      if (!updatedBlog) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Blog not found',
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Blog updated successfully',
        data: updatedBlog,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to update blog',
        error: error.message,
      });
    }
  }

  @Delete('delete-blog/:id')
  async deleteBlog(@Param('id') id: string, @Res() res: Response) {
    try {
      const deletedBlog = await this.blogService.deleteBlog(
        new Types.ObjectId(id),
      );
      if (!deletedBlog) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Blog not found',
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Blog deleted successfully',
        data: deletedBlog,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to delete blog',
        error: error.message,
      });
    }
  }
}
