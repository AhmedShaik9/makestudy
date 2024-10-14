import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBlogDto } from 'src/dtos/blog.dto';
import { Blog } from 'src/models/admin/blogs.schema';
import { promises as fs } from 'fs';
import { join } from 'path';
import { SlugService } from 'src/libs/common/src/slug/slug.service';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel('Blog') private readonly blogModel: Model<Blog>,
    private slugService: SlugService,
  ) {}

  async getAllBlogs(skip: number, limit: number) {
    const countDocuments = await this.blogModel.estimatedDocumentCount();
    const blogs = await this.blogModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .exec();
    return { blogs, countDocuments };
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

  async createBlog(blog: CreateBlogDto) {
    try {
      const newBlog = await new this.blogModel(blog);
      newBlog.slug = await this.slugService.generateUniqueSlug(
        blog.title,
        this.blogModel,
      );
      await newBlog.save();
    } catch (error) {
      return error;
    }
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
    } catch (error) {
      console.error('Error deleting files:', error);
    }

    return this.blogModel.findByIdAndDelete(id).exec();
  }
}
