import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should extract text from a valid PDF file', async () => {
    const mockText = 'Extracted text from PDF';
    jest.spyOn(appService, 'extractTextFromPdf').mockResolvedValue(mockText);

    const mockFile = { buffer: Buffer.from('mock pdf data') } as Express.Multer.File;
    const result = await appController.processFile(mockFile);

    expect(result).toEqual({ text: mockText });
    expect(appService.extractTextFromPdf).toHaveBeenCalledWith(mockFile.buffer);
  });
});
