import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ScrapeDocsDomain, ScrapeRequestDto } from './dto/scrape-request.dto';

@Controller()
export class ScrapperController {
  constructor(private readonly scrapperService: ScrapperService) {}

  @Get()
  getHello() {
    return this.scrapperService.getHello();
  }

  @Post('scrape')
  scrapeSingleWebsite(@Body() body: ScrapeRequestDto) {
    return this.scrapperService.scrapeSingleWebsite(body);
  }

  @Post('scrape/domain')
  scrapeDomain(@Body() body: ScrapeRequestDto) {
    return this.scrapperService.scrapeDomain(body);
  }

  @Post('scrape/docs')
  scrapeAllSites(@Body() body: ScrapeDocsDomain[]) {
    return this.scrapperService.scrapeAllSites(body);
  }
}
