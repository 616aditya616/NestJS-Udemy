import { Module } from'@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { user } from './user.entity'

@Module({
    imports:[TypeOrmModule.forFeature([user])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}