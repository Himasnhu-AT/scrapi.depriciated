import { Injectable } from '@nestjs/common';
import { FetchURLOptions } from '@scrapi/common';

@Injectable()
export class GlobalVarsService {
  universalTimeout() {
    return 30000; // 30 seconds
  }

  allowedContentTypes() {
    return ['html'];
  }

  allowedStatusCodes() {
    return [200];
  }

  pageOptions(): FetchURLOptions {
    return {
      universalTimeout: this.universalTimeout(),
      allowed_content_types: this.allowedContentTypes(),
      allowed_status_codes: this.allowedStatusCodes(),
    };
  }

  scrapperName(): [string] {
    return ['axios'];
  }
}
