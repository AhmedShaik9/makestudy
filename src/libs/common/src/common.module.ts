import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { MulterService } from './multer/multer.service';
import { MulterModule } from './multer/multer.module';

@Module({
  providers: [CommonService, MulterService],
  exports: [CommonService],
  imports: [MulterModule],
})
export class CommonModule {}
