import { Injectable } from '@nestjs/common';
import { TextractClient, AnalyzeDocumentCommand } from '@aws-sdk/client-textract';
import { fromBuffer } from 'pdf2pic';

@Injectable()
export class AppService {
  private textract: TextractClient;

  constructor() {
    this.textract = new TextractClient();
  }

  async convertPdfToPng(buffer: Buffer): Promise<Buffer[]> {
    const pages = await fromBuffer(buffer, {
      quality: 100,
      density: 300,
      format: 'png',
    }).bulk(-1, { responseType: 'buffer' });
    return pages.map(page => page.buffer);
  }

  async extractTextFromImage(buffer: Buffer): Promise<string> {
    const response = await this.textract.send(new AnalyzeDocumentCommand({
      Document: {
        Bytes: buffer,
      },
      FeatureTypes: ['LAYOUT'],
    }));

    const blockDict = response.Blocks.reduce((acc, block) => {
      acc[block.Id] = block
      return acc
    }, {})

    return response.Blocks
      .reduce((acc, block) => {
        switch (block.BlockType) {
          case 'LAYOUT_TITLE':
          case 'LAYOUT_SECTION_HEADER':
          case 'LAYOUT_TEXT':
            acc += block.Relationships[0].Ids.map(id => blockDict[id].Text).join(' ') + '\n';
            break;
        }
        return acc;
      }, '');
  }

  async extractTextFromPdf(buffer: Buffer): Promise<string> {
    const images = await this.convertPdfToPng(buffer);
    const textFromImages = await Promise.all(images.map(async image => (
      this.extractTextFromImage(image)
    )));
    
    return textFromImages.join('\n');
  }
}
