import { Module } from'@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { user } from './user.entity'
import { AuthService } from './auth.service'
import { CurrentUserInterceptor } from './current-user.interceptor'

@Module({
    imports:[TypeOrmModule.forFeature([user])],
    controllers: [UsersController],
    providers: [UsersService,AuthService,CurrentUserInterceptor],
})
export class UsersModule {}