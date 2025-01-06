import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module.ts'
import { ReportsModule } from './reports/reports.ts'
import { user } from '../users/user.entity'
import { Report } from 'reports/report.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [user,Report],
    synchronize: true,
  }),
    UsersModule,ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
