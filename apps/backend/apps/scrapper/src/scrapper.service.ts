import { FetchService } from '@app/fetch/fetch.service';
import { FetchScrapperService } from '@app/fetch/scrappers/axios.scrapper';
import { GlobalVarsService } from '@app/global';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ScrapeRequestDto } from './dto/scrape-request.dto';

@Injectable()
export class ScrapperService {
  constructor(
    private readonly globalVarsService: GlobalVarsService,
    private readonly fetchScrapperService: FetchScrapperService,
  ) {}

  getHello() {
    return 'Scapper service is working';
  }

  async scrapeSingleWebsite(body: ScrapeRequestDto) {
    const url: string = body.url;

    if (!url) {
      throw new NotFoundException('URL is required');
    }

    if (!this.globalVarsService.scrapperName().includes(body.scrapperName)) {
      throw new NotFoundException(
        `allowed scrapers: ${this.globalVarsService.scrapperName()}`,
      );
    }

    const pageOptions =
      body.pageOptions ?? this.globalVarsService.pageOptions();

    const fetchService = new FetchService(
      this.globalVarsService,
      this.fetchScrapperService,
    );
    try {
      const result = await fetchService.FetchURL({
        url,
        scrapper: 'axios',
        options: pageOptions,
      });
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async scrapeDomain(body: ScrapeRequestDto) {
    const url: string = body.url;

    if (!url) {
      throw new NotFoundException('URL is required');
    }

    if (!this.globalVarsService.scrapperName().includes(body.scrapperName)) {
      throw new NotFoundException(
        `allowed scrapers: ${this.globalVarsService.scrapperName()}`,
      );
    }

    const pageOptions =
      body.pageOptions ?? this.globalVarsService.pageOptions();

    const fetchService = new FetchService(
      this.globalVarsService,
      this.fetchScrapperService,
    );

    try {
      const result = await fetchService.scrapeAllSites(url);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
