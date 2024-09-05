import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBlogDto } from 'src/dtos/blog.dto';
import { Blog } from 'src/models/admin/blogs.schema';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class BlogsService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  getAllBlogs(skip: number, limit: number): Promise<Blog[]> {
    return this.blogModel
      .find()
      .where('is_published')
      .equals('Y')
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .exec();
  }
  // get all blogs admin
  getAllBlogsAdmin(skip: number, limit: number): Promise<Blog[]> {
    return this.blogModel.find().skip(skip).limit(limit).exec();
  }
  // get unpublished blogs
  getUnpublishedBlogs(skip: number, limit: number): Promise<Blog[]> {
    return this.blogModel
      .find()
      .where('is_published')
      .equals('N')
      .skip(skip)
      .limit(limit)
      .exec();
  }

  getBlogById(id: Types.ObjectId): Promise<Blog> {
    return this.blogModel.findById(id).exec();
  }

  getBlogBySlug(slug: string): Promise<Blog> {
    return this.blogModel.findOne({ slug }).exec();
  }

  createBlog(blog: CreateBlogDto): Promise<Blog> {
    return this.blogModel.create(blog);
  }

  updateBlog(id: Types.ObjectId, blog: CreateBlogDto): Promise<Blog> {
    return this.blogModel.findByIdAndUpdate(id, blog, { new: true }).exec();
  }

  async deleteBlog(id: Types.ObjectId): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    // Delete the associated images
    const featuredImagePath = join(
      __dirname,
      '..',
      '..',
      'uploads',
      'blogs',
      blog.featured_image,
    );
    const thumbImagePath = join(
      __dirname,
      '..',
      '..',
      'uploads',
      'blogs',
      blog.thumb_image,
    );

    try {
      await fs.unlink(featuredImagePath);
      await fs.unlink(thumbImagePath);
      console.log(
        'Files deleted successfully',
        featuredImagePath,
        thumbImagePath,
      );
    } catch (error) {
      console.error('Error deleting files:', error);
      // Log the error but continue with the deletion of the blog
    }

    return this.blogModel.findByIdAndDelete(id).exec();
  }
}
