import { readFile } from 'node:fs/promises'
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should extract text from a valid PDF file', async () => {
    const file = await readFile('./test/samples/simple.pdf')
    return request(app.getHttpServer())
      .post('/extract')
      .attach('file', file, 'simple.pdf')
      .expect(201)
      .expect({ text: 'Some dummy data\n' });
  });

  it('should extract text from an empty PDF file', async () => {
    const file = await readFile('./test/samples/empty.pdf')
    return request(app.getHttpServer())
      .post('/extract')
      .attach('file', file, 'empty.pdf')
      .expect(201)
      .expect({ text: '' });
  });

  it('should respond with error for big size file', async () => {
    const file = await readFile('./test/samples/big-size.pdf')
    return request(app.getHttpServer())
      .post('/extract')
      .attach('file', file, 'big-size.pdf')
      .expect(400)
      .expect({
        message: 'Validation failed (expected size is less than 5242880)',
        error: 'Bad Request',
        statusCode: 400
      });
  });

  it('should respond with error for incorrect type file', async () => {
    const file = await readFile('./test/samples/incorrect-type.jpeg')
    return request(app.getHttpServer())
      .post('/extract')
      .attach('file', file, 'incorrect-type.jpeg')
      .expect(400)
      .expect({
        message: 'Validation failed (expected type is application/pdf)',
        error: 'Bad Request',
        statusCode: 400
      });
  });

  it('should respond with error for no file', async () => {
    return request(app.getHttpServer())
      .post('/extract')
      .attach('file', Buffer.from(''))
      .expect(400)
      .expect({
        message: 'File is required',
        error: 'Bad Request',
        statusCode: 400
      });
  });
});
