import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { MulterService } from './multer/multer.service';
import { MulterModule } from './multer/multer.module';
import { SlugService } from './slug/slug.service';

@Module({
  providers: [CommonService, MulterService, SlugService],
  exports: [CommonService, MulterService, SlugService],
  imports: [MulterModule],
})
export class CommonModule {}
