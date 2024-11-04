import { Module } from '@nestjs/common';
import { FetchService } from './fetch.service';
import { GlobalVarsService } from '@app/global';
import { FetchScrapperService } from './scrappers/axios.scrapper';

@Module({
  providers: [FetchService, GlobalVarsService, FetchScrapperService],
  exports: [FetchService],
})
export class FetchModule {}
