import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('extract')
  @UseInterceptors(FileInterceptor('file'))
  async processFile(@UploadedFile(new ParseFilePipe({ validators: [
    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
    new FileTypeValidator({ fileType: 'application/pdf' }),
  ]})) file: Express.Multer.File) {
    const text = await this.appService.extractTextFromPdf(file.buffer);
    return { text }
  }
}
