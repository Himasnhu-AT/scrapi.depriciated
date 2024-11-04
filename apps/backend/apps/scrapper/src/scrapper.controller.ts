import { Controller, Get } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';

@Controller()
export class ScrapperController {
  constructor(private readonly scrapperService: ScrapperService) {}

  @Get()
  getHello() {
    return this.scrapperService.getHello();
  }

  @Get('scrape')
  scrapeSingleWebsite() {
    return this.scrapperService.scrapeSingleWebsite();
  }
}
