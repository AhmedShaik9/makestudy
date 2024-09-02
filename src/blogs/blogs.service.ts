import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBlogDto } from 'src/dtos/blog.dto';
import { Blog } from 'src/models/admin/blogs.schema';

@Injectable()
export class BlogsService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}
  getAllBlogs(): Promise<Blog[]> {
    return this.blogModel.find();
  }

  getBlogById(id: Types.ObjectId): Promise<Blog> {
    return this.blogModel.findById(id);
  }

  getBlogBySlug(slug: string): Promise<Blog> {
    return this.blogModel.findOne({ slug });
  }

  createBlog(blog: CreateBlogDto): Promise<Blog> {
    console.log(blog);
    return this.blogModel.create(blog);
  }

  updateBlog(id: Types.ObjectId, blog: CreateBlogDto): Promise<Blog> {
    return this.blogModel.findByIdAndUpdate(id, blog, { new: true });
  }

  deleteBlog(id: Types.ObjectId): Promise<Blog> {
    return this.blogModel.findByIdAndDelete(id);
  }
}
