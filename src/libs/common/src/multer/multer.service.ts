// src/libs/common/src/multer/multer.service.ts
import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Injectable()
export class MulterService {
  getMulterOptions(folder: string) {
    return {
      storage: diskStorage({
        destination: `uploads/${folder}`,
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    };
  }
}
