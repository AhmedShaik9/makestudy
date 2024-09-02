import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express'; // Import Response from express
import { BlogsService } from './blogs.service';
import { Types } from 'mongoose';
import { CreateBlogDto } from 'src/dtos/blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}

  @Get()
  async getAllBlogs(@Res() res: Response) {
    try {
      const blogs = await this.blogService.getAllBlogs();
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Blogs fetched successfully',
        data: blogs,
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
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Res() res: Response) {
    try {
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
  async updateBlog(
    @Param('id') id: string,
    @Body() createBlogDto: CreateBlogDto,
    @Res() res: Response,
  ) {
    try {
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

  @Post('delete-blog/:id')
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
