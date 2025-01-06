import { Module } from '@nestjs/common'
import { ReportsController } from '../reports/reports.controller.ts'
import { ReportsService } from '../reports/reports.service.ts'
import { TypeOrmModule } from 'typeorm'
import { Report } from '../reports/report.entity' 

@Module({
    imports:[TypeOrmModule.forFeature([Report])],
    controllers: [ReportsController],
    providers: [ReportsService]
})
export class ReportsModule {}