import { Test, TestingModule } from '@nestjs/testing';
import { FetchService } from './fetch.service';
import { GlobalVarsService } from '@app/global';
import { FetchScrapperService } from './scrappers/axios.scrapper';
import * as fs from 'fs';
import * as path from 'path';
import '../test/test.env';

describe('FetchService', () => {
  let service: FetchService;
  let tempDir: string;

  beforeAll(() => {
    tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchService, GlobalVarsService, FetchScrapperService],
    }).compile();

    service = module.get<FetchService>(FetchService);
  });

  afterAll(() => {
    // Clean up temp directory after tests
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('should save markdown output to temp file when testing', async () => {
    const testUrl = 'http://example.com';
    await service.FetchURL({ url: testUrl, scrapper: 'axios' });

    const files = fs.readdirSync(tempDir);
    expect(files.some((file) => file.includes('example_com'))).toBeTruthy();
  });
});
