import { Body , Controller , Post,Get,Patch,Param,Query,Delete, NotFoundException, UseInterceptors} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user.dto';
import { Serialize, SerializeInterceptor } from 'interceptors/serialize.interceptors';
import { UserDto } from './user.dto';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService){}
    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
        this.usersService.create(body.email,body.password)
    }
    
    @Get('/:id')
    async findUser(@Param('id') id: string){
        const user = await this.usersService.findOne(parseInt(id))
        if (!user) {
            throw new NotFoundException('user not found')
        }
    }
    @Get()
    findAllUsers(@Query('email') email: string){
        return this.usersService.find(email)
    }
    @Delete('/:id')
    removeUser(@Param('id') id:string) {
        return this.usersService.remove(parseInt(id))
    }
    @Patch('/:id')
    updateUser(@Param('id') id:string , @Body() body:UpdateUserDto){
    return this.usersService.update(parseInt(id),body)
    }
}