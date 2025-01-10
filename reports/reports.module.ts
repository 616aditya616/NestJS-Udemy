import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Report } from '../reports/report.entity'
import { ReportsService } from './report.service'
import { ReportsController } from './reports.controller' 

@Module({
    imports:[TypeOrmModule.forFeature([Report])],
    controllers: [ReportsController],
    providers: [ReportsService]
})
export class ReportsModule {}