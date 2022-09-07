import { Controller, Post, Body } from '@nestjs/common';
import { CloudMessageService } from './cloud-message.service';

@Controller('cloud')
export class CloudMessageController {
  constructor(private readonly cloudMessageService: CloudMessageService) {}

  @Post('save')
  saveRetrieveToken(@Body() body: any){

  }
}
