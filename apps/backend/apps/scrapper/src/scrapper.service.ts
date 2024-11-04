import { Injectable } from '@nestjs/common';

@Injectable()
export class ScrapperService {
  getHello(): string {
    return 'Hello World!';
  }
}
