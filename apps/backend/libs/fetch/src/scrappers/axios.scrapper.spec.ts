import { Test, TestingModule } from '@nestjs/testing';
import { FetchScrapperService } from './axios.scrapper';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { GlobalVarsService } from '@app/global';
// import { Logger } from '../../global/src/logger';

describe('FetchScrapperService', () => {
  let service: FetchScrapperService;
  let mockAxios: MockAdapter;
  const globalVars = new GlobalVarsService().pageOptions();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchScrapperService, GlobalVarsService],
    }).compile();

    service = module.get<FetchScrapperService>(FetchScrapperService);
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch URL successfully', async () => {
    const url = 'http://example.com';
    const responseData = '<html><body>Example</body></html>';
    mockAxios.onGet(url).reply(200, responseData);

    const result = await service.fetchURLWithAxios(
      url,
      globalVars.universalTimeout,
      globalVars.allowed_content_types,
      globalVars.allowed_status_codes,
    );

    expect(result.content).toBe(responseData);
    expect(result.pageStatusCode).toBe(200);
    expect(result.pageError).toBeNull();
  });

  it('should handle non-200 status codes', async () => {
    const url = 'http://example.com';
    mockAxios.onGet(url).reply(404, 'Not Found');

    const result = await service.fetchURLWithAxios(
      url,
      globalVars.universalTimeout,
      globalVars.allowed_content_types,
      globalVars.allowed_status_codes,
    );

    expect(result.content).toBe('');
    expect(result.pageStatusCode).toBe(404);
    expect(result.pageError).toBe('Request failed with status code 404');
  });

  it('should handle request timeout', async () => {
    const url = 'http://example.com';
    mockAxios.onGet(url).timeout();

    const result = await service.fetchURLWithAxios(
      url,
      globalVars.universalTimeout,
      globalVars.allowed_content_types,
      globalVars.allowed_status_codes,
    );

    expect(result.content).toBe('');
    expect(result.pageStatusCode).toBeNull();
    expect(result.pageError).toBe('Request timed out');
  });
});
