import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './report.service';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
}