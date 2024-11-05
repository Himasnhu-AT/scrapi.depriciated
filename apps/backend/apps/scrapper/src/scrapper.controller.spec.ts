import { Test, TestingModule } from '@nestjs/testing';
import { ScrapperController } from './scrapper.controller';
import { ScrapperService } from './scrapper.service';
import { FetchService } from '@app/fetch';
import { FetchScrapperService } from '@app/fetch/scrappers/axios.scrapper';
import { GlobalVarsService } from '@app/global';

describe('ScrapperController', () => {
  let scrapperController: ScrapperController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ScrapperController],
      providers: [
        ScrapperService,
        FetchService,
        FetchScrapperService,
        GlobalVarsService,
      ],
    }).compile();

    scrapperController = app.get<ScrapperController>(ScrapperController);
  });

  describe('root', () => {
    it('should return "Scapper service is working"', () => {
      expect(scrapperController.getHello()).toBe('Scapper service is working');
    });
  });
});
