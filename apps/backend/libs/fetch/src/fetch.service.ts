import { GlobalVarsService } from '@app/global';
import { Injectable } from '@nestjs/common';
import { FetchScrapperService } from './scrappers/axios.scrapper';
import * as cheerio from 'cheerio';
import * as TurndownService from 'turndown';
import { excludeNonMainTags } from '@app/global/excludedTags';
import { FetchURLOptions } from '@scrapi/common';

@Injectable()
export class FetchService {
  private turndownService: TurndownService;

  constructor(
    private readonly globalVarsService: GlobalVarsService,
    private readonly fetchScrapperService: FetchScrapperService,
  ) {
    this.turndownService = new TurndownService();
  }

  async FetchURL({
    url,
    scrapper = 'axios',
    options,
  }: {
    url: string;
    scrapper: 'axios';
    options?: FetchURLOptions;
  }) {
    const pageOptions = options ?? this.globalVarsService.pageOptions();

    switch (scrapper) {
      case 'axios':
        const output = await this.fetchScrapperService.fetchURLWithAxios(
          url,
          pageOptions.universalTimeout,
          pageOptions.allowed_content_types,
          pageOptions.allowed_status_codes,
        );

        // remove tags from global/src/excludedTags, then return text only
        const $ = cheerio.load(output.content);

        // Remove excluded tags
        excludeNonMainTags.forEach((selector) => {
          $(selector).remove();
        });

        // Remove style tags and inline styles
        $('style').remove();
        $('[style]').removeAttr('style');

        const markdownContent = this.turndownService.turndown($.html());

        return {
          ...output,
          content: markdownContent,
        };
    }
  }
}
