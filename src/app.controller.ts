import { Controller, Get } from '@nestjs/common';
import { AppService } from './appp.service';

@Controller('')
export class AppControler {
  constructor(private readonly appService: AppService) {}

  @Get()
  startApi() {
    return this.appService.startApi();
  }
}
