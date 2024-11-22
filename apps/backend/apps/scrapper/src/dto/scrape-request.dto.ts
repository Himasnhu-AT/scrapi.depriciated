import { FetchURLOptions } from '@scrapi/common';

export class ScrapeRequestDto {
  url: string;
  scrapperName: string;
  pageOptions?: FetchURLOptions;
}

export class ScrapeDocsDomain {
  name: string;
  crawlerStart: string;
  crawlerPrefix: string;
  scrapperName: string;
  pageOptions?: FetchURLOptions;
}
