import { FetchURLOptions } from '@scrapi/common';

export class ScrapeRequestDto {
  url: string;
  scrapperName: string;
  pageOptions?: FetchURLOptions;
}
