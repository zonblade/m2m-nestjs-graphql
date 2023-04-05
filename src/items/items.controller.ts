import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Http, HttpCode } from 'src/common.interface';
import { v4 as uuidv4 } from 'uuid';

@Controller('items')
export class ItemsController {
  @Post('/image-upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'storage',
        filename: (req, file, cb) => {
          const randomName = uuidv4();
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file) {
    const result = Http({
      http: HttpCode.Success,
      message: null,
      data: {
        originalname: file.originalname,
        filename: file.filename,
      },
    });
    return result;
  }
}
