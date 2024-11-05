import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ScrapeRequestDto } from './dto/scrape-request.dto';

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
}
