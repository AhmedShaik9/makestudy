import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import slugify from 'slugify';

@Injectable()
export class SlugService {
  async generateUniqueSlug(title: string, model: Model<any>): Promise<string> {
    const baseSlug = slugify(title, { lower: true });
    let slug = baseSlug;
    let counter = 1;

    // Check for existing slugs
    while (await model.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    return slug;
  }
}
