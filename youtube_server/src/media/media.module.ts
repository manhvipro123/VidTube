import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { forwardRef } from '@nestjs/common';
import { VideoModule } from 'src/video/video.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from 'src/models/video.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'video', schema: VideoSchema }],'youtube-clone'),
        forwardRef(() => VideoModule),
    ],
    controllers: [MediaController],
    providers: [MediaService],
    exports: [MediaService]
})
export class MediaModule { }