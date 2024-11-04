import { FetchService } from '@app/fetch/fetch.service';
import { FetchScrapperService } from '@app/fetch/scrappers/axios.scrapper';
import { GlobalVarsService } from '@app/global';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScrapperService {
  constructor(
    private readonly globalVarsService: GlobalVarsService,
    private readonly fetchScrapperService: FetchScrapperService,
  ) {}

  getHello() {
    return 'Scapper service is working';
  }

  async scrapeSingleWebsite() {
    const fetchService = new FetchService(
      this.globalVarsService,
      this.fetchScrapperService,
    );
    try {
      const result = await fetchService.FetchURL({
        url: 'http://example.com',
        scrapper: 'axios',
      });
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
