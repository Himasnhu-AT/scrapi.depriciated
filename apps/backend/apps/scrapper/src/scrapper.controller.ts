import { Controller, Get } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';

@Controller()
export class ScrapperController {
  constructor(private readonly scrapperService: ScrapperService) {}

  @Get()
  getHello(): string {
    return this.scrapperService.getHello();
  }
}
