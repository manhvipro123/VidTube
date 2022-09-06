import {
  Controller, Post, Req, Res, UseInterceptors, UploadedFile, HttpException, HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(public mediaService: MediaService) { }

  // @Post('test')
  // test() {
  //   return this.mediaService.cutAudio('123');
  // }

  @Post()
  @UseInterceptors(FileInterceptor('video',
    {
      storage: diskStorage({
        destination: './uploads/vids',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          cb(null, filename);
        }
      })
    })
  )
  async create(@UploadedFile() file: Express.Multer.File) {
    if (file) {
      return await this.mediaService.cutVideo(file);
    } else {
      throw new HttpException('File is empty', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('thumb')
  @UseInterceptors(FileInterceptor('image',
    {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          cb(null, filename);
        }
      })
    })
  )
  async cutThumb(@UploadedFile() file: Express.Multer.File) {
    if (file) {
      return await this.mediaService.cutThumbFromVid(file);
    } else {
      throw new HttpException('File is empty', HttpStatus.BAD_REQUEST);
    }
  }
}
