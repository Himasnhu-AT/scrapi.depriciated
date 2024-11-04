import { Module } from '@nestjs/common';
import { ScrapperController } from './scrapper.controller';
import { ScrapperService } from './scrapper.service';
import { FetchService } from '@app/fetch/fetch.service';
import { FetchScrapperService } from '@app/fetch/scrappers/axios.scrapper';
import { GlobalVarsService } from '@app/global';

@Module({
  imports: [],
  controllers: [ScrapperController],
  providers: [
    ScrapperService,
    FetchService,
    FetchScrapperService,
    GlobalVarsService,
  ],
})
export class ScrapperModule {}
