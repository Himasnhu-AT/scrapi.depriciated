import { GlobalVarsService } from '@app/global';
import { Injectable } from '@nestjs/common';
import { FetchScrapperService } from './scrappers/axios.scrapper';

@Injectable()
export class FetchService {
  constructor(
    private readonly globalVarsService: GlobalVarsService,
    private readonly fetchScrapperService: FetchScrapperService,
  ) {}

  async FetchURL({
    url,
    scrapper = 'axios',
    options,
  }: {
    url: string;
    scrapper: 'axios';
    options?: {
      universalTimeout: number;
      allowed_content_types: string[];
      allowed_status_codes: number[];
    };
  }) {
    const pageOptions = options ?? this.globalVarsService.pageOptions();

    switch (scrapper) {
      case 'axios':
        return this.fetchScrapperService.fetchURLWithAxios(
          url,
          pageOptions.universalTimeout,
          pageOptions.allowed_content_types,
          pageOptions.allowed_status_codes,
        );
    }
  }
}
