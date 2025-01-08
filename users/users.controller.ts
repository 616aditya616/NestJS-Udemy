import { UseGuards,Session,Body , Controller , Post,Get,Patch,Param,Query,Delete, NotFoundException, UseInterceptors} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user.dto';
import { Serialize, SerializeInterceptor } from 'interceptors/serialize.interceptors';
import { UserDto } from './user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from '../users/current-user-decorator'
import { CurrentUserInterceptor } from './current-user.interceptor';
import { user } from './user.entity'
import { AuthGuard } from 'src/guards/auth.guard';

@Serialize(UserDto)
@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(private usersService: UsersService , private authService:AuthService){}
    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user:user){
        return user;
    }
    
    @Post('/signout')
    signOut(@Session() session: any){
        session.userId=null;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto,@Session() session:any){
        const user = await this.authService.signup(body.email,body.password)
        session.userId = user.id
        return user;
    }
    @Post('/signin')
    async signin(@Body() body:CreateUserDto,@Session() session:any){
        const user = await this.authService.signin(body.email,body.password)
        session.userId = user.id
        return user;
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